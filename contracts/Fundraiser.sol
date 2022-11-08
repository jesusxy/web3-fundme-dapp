// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract FundraiserStore {
    Fundraiser[] public deployedFundraisers;

    function createFundraiser(
        uint256 _goalAmount,
        uint256 _expiryDate,
        string memory _organizer,
        string memory _title,
        string memory _description,
        address _recipientAddress
    ) public {
        // host will be the one who calls and creates fundraiser
        address hostAddress = msg.sender;
        Fundraiser _fundraiser = new Fundraiser(
            _goalAmount,
            _expiryDate,
            _organizer,
            _title,
            _description,
            _recipientAddress,
            hostAddress
        );

        deployedFundraisers.push(_fundraiser);
    }

    // get all deployed fundraisers
    function getAll() public view returns (Fundraiser[] memory) {
        return deployedFundraisers;
    }
}

contract Fundraiser {
    struct Donation {
        address donor;
        uint256 amountDonated;
    }

    uint256 expiryDate;
    address public recipient;
    // fundraiser meta data
    string public description;
    string public title;
    string public firstName;
    string public lastName;
    uint256 public goalAmount;
    address hostAddress;
    string hostName;
    address recipientAddress;

    // mapping of donors -> total amount contributed to fundraisers;
    mapping(address => uint256) public donorsContribution;

    // total donors in fundraiser
    uint256 public donors;

    // amount of money donated to fundraiser - initialized to 0. because we can withdraw any time we use this to track al lfunds made to contract.
    // cant we just use the balance of the fundraiser contract instead of having variable ?
    uint256 public fundraiserAmount = 0;

    // array of all donations to this fundraiser
    Donation[] public donations;

    bool public ongoing = true;

    ///////////////////////// EVENTS /////////////////////////////////////////

    event Contract_Created(
        address indexed _from,
        address indexed _contract,
        string _description
    );

    event Funds_Donated(
        address indexed _from,
        address indexed _contract,
        uint256 _value
    );

    event Goal_Reached(
        address indexed _from,
        address indexed _contract,
        uint256 _value
    );

    event Fundraiser_Ended(
        address indexed _from,
        address indexed _contract,
        uint256 _value
    );

    event Fund_Withdraw(
        address indexed _from,
        address indexed _contract,
        uint256 _value
    );

    modifier onlyOwner() {
        require(
            msg.sender == recipient,
            "Action can only be performed by Contract owner"
        );
        _;
    }

    modifier isLive() {
        require(ongoing, "This Fundraiser has ended");
        _;
    }

    // @notice constructor of Fundraiser Contract
    constructor(
        uint256 _goalAmount,
        uint256 _expiryDate,
        string memory _organizer,
        string memory _title,
        string memory _description,
        address _recipientAddress,
        address _hostAddress
    ) {
        goalAmount = _goalAmount;
        expiryDate = _expiryDate;
        title = _title;
        description = _description;
        hostName = _organizer;
        hostAddress = _hostAddress;
        recipientAddress = _recipientAddress;

        emit Contract_Created(_recipientAddress, address(this), _description);
    }

    ///////////////////////// GETTERs /////////////////////////////////////////

    function getBalance() public view isLive returns (uint256) {
        return address(this).balance;
    }

    function getGoalAmount() public view isLive returns (uint256) {
        return goalAmount;
    }

    // we need to return fundraiser Balance in order to render a progress bar on FE
    function getCardDetails()
        public
        payable
        returns (
            uint256 _goalAmount,
            string memory _hostName,
            string memory _title,
            string memory _description,
            address _fundraiserAddress,
            uint256 _fundraiserBalance
        )
    {
        return (
            goalAmount,
            hostName,
            title,
            description,
            address(this),
            address(this).balance
        );
    }

    function getAllFundraiserDetails()
        public
        view
        returns (
            uint256 _goalAmount,
            uint256 _donors,
            uint256 _expiryDate,
            bool _ongoing,
            string memory _hostName,
            string memory _title,
            string memory _description,
            address _hostAddress,
            address _recipientAddress,
            address _fundraiserAddress,
            uint256 _fundraiserBalance
        )
    {
        return (
            goalAmount,
            donors,
            expiryDate,
            ongoing,
            hostName,
            title,
            description,
            hostAddress,
            recipientAddress,
            address(this),
            address(this).balance
        );
    }

    /////////////////////////////// ACTIONS /////////////////////////////////////

    // @notice payable function, takes contribution for the fundraiser
    function donate() public payable isLive {
        donorsContribution[msg.sender] = msg.value;
        fundraiserAmount += msg.value;
        donors++;

        _createDonation(msg.sender, msg.value);

        emit Funds_Donated(msg.sender, address(this), msg.value);

        // if goal of fundraiser has been reached, end the fundraiser;
        if (fundraiserAmount > goalAmount) {
            _end();
        }
    }

    function _createDonation(address donor, uint256 amount) private {
        Donation memory newDonation = Donation({
            donor: donor,
            amountDonated: amount
        });

        donations.push(newDonation);
    }

    function withdraw() public onlyOwner isLive {
        uint256 balance = getBalance();
        require(balance != 0, "Can not withdraw from 0 balance");

        emit Fund_Withdraw(recipient, address(this), balance);
        payable(recipient).transfer(address(this).balance);
    }

    function end() public onlyOwner isLive {
        ongoing = false;
        emit Fundraiser_Ended(recipient, address(this), fundraiserAmount);

        payable(recipient).transfer(address(this).balance);
    }

    function _end() private {
        ongoing = false;
        emit Goal_Reached(recipient, address(this), fundraiserAmount);
        payable(recipient).transfer(address(this).balance);
    }
}
