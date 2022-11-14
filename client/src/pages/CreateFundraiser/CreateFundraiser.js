import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Container from 'react-bootstrap/Container';

import useFundraiserContract from "../../hooks/useFundraiserContract";
import TxnLoader from "../../components/TxnLoader";
import Button from "react-bootstrap/Button";
import "../../styles/CreateFundraiser.scss";

import { ethers } from "ethers";

const tomorrow = new Date(Date.now() + 86400000);
tomorrow.setHours(0, 0, 0, 0);

const formatDate = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return mm + "-" + dd + "-" + yyyy;
};

const CreateFundraiserView = (props) => {
  const { provider, signer, fundraiserContract } = useFundraiserContract();
  const [isTxnLoading, setIsTxnLoading] = useState(false);
  // use ethers to convert eth -> wei
  const toWei = (amount) => ethers.utils.formatEther(amount);

  // create data model
  const formSchema = yup.object().shape({
    hostName: yup.string().required().min(3),
    title: yup.string().required().min(3),
    goalAmount: yup.number().typeError("You must specify an amount").required(),
    expiryDate: yup
      .date()
      .typeError("You must specify a valid date")
      .required()
      .min(tomorrow, "Expiry Date of the fundraiser should be a later date"),
    recipientAddress: yup
      .string()
      .required()
      .test("isAddress", "Enter a valid Ethereum address", function (value) {
        return ethers.utils.isAddress(value);
      }),
    description: yup.string().required().min(200),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        hostName: "",
        title: "",
        goalAmount: "",
        expiryDate: "",
        recipientAddress: "",
        description: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const dateToBigInt = (date) => new Date(date).getTime() / 1000;
  const onCreateSubmit = async (data) => {
    setIsTxnLoading(true);
    let {
      goalAmount,
      expiryDate,
      hostName,
      title,
      description,
      recipientAddress,
    } = data;
    
    try {
      // call contract method to create a new Fundraiser
      await fundraiserContract.createFundraiser(
        ethers.utils.parseUnits(goalAmount.toString(), "ether"),
        dateToBigInt(expiryDate),
        hostName.toString(),
        title.toString(),
        description.toString(),
        recipientAddress.toString()
      );

      alert(`Transaction successful`)
      console.log("____ create fundraiser fired ____", data);
    } catch (e) {
      alert(`Transaction error. ${e.message}`);
    }

    setIsTxnLoading(false);
    props.updateFundraisers();
  };

  return (
    <>
      {isTxnLoading && <TxnLoader />}
      <div className="CreateFundraiser">
        <section>
          <h1 className="mb-4">Create a Fundraiser</h1>
          <form
            onSubmit={handleSubmit(onCreateSubmit)}
            className="CreateFundraiser__form"
          >
            <div className="CreateFundraiser__grid-item CreateFundraiser__hostname">
              <input
                type="text"
                name="hostName"
                id="hostName"
                placeholder="Organizer Name"
                {...register("hostName")}
              />
              {errors.hostName && <span>{errors.hostName.message}</span>}
            </div>
            <div className="CreateFundraiser__grid-item CreateFundraiser__title">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Fundraiser Title"
                {...register("title")}
              />
              {errors.title && <span>{errors.title.message}</span>}
            </div>
            <div className="CreateFundraiser__grid-item CreateFundraiser__goalAmount">
              <input
                type="number"
                name="goalAmount"
                id="goalAmount"
                placeholder="Goal Amount (ETH)"
                {...register("goalAmount")}
              />
              {errors.goalAmount && <span>{errors.goalAmount.message}</span>}
            </div>
            <div className="CreateFundraiser__grid-item CreateFundraiser__date">
              <input
                type="date"
                name="expiryDate"
                id="expiryDate"
                min={formatDate(tomorrow)}
                {...register("expiryDate")}
              />
              {errors.expiryDate && <span>{errors.expiryDate.message}</span>}
            </div>
            <div className="CreateFundraiser__grid-item CreateFundraiser__recipient">
              <input
                type="text"
                name="recipientAddress"
                id="recipientAddress"
                placeholder="Recipient Address (ETH)"
                {...register("recipientAddress")}
              />
              {errors.recipientAddress && (
                <span>{errors.recipientAddress.message}</span>
              )}
            </div>
            <div className="CreateFundraiser__grid-item CreateFundraiser__description">
              <textarea
                name="description"
                id="description"
                rows="4"
                placeholder="Describe need for the fundraiser in detail.."
                {...register("description")}
              ></textarea>
              {errors.description && <span>{errors.description.message}</span>}
            </div>
            <div className="d-grid gap-2">
              <Button type="submit" size="lg">Create</Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default CreateFundraiserView;
