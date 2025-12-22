"use client";

import { useEffect, useState } from "react";
import { profileDetailsAction } from "@/app/_services/actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

function BasicDetailsComponent({ profileDetails }) {
  const [isUpadating, setIsUpdating] = useState(false);
  const {
    shop_name: shopName,
    phone,
    email,
    nic,
    owner_name: ownerName,
  } = profileDetails[0];

  const [formData, setFormData] = useState({
    shop_name: shopName,
    phonenumber: phone,
    email: email,
    nationalID: nic,
    owner_name: ownerName,
  });

  const handleSubmit = async () => {
    setIsUpdating(true);
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, val]) =>
      formDataObj.append(key, val),
    );

    try {
      await profileDetailsAction(formDataObj);

      toast.success("successfully profile updated");
    } catch (error) {
      toast.error("An error occured");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      shop_name: shopName ?? "",
      phonenumber: phone ?? "",
      email: email ?? "",
      nationalID: nic ?? "",
      owner_name: ownerName ?? "",
    });
  };

  return (
    <div className="mx-auto mt-5 w-full max-w-2xl pb-10 lg:ml-4">
      <div className="rounded-xl bg-white px-5 pt-5 pb-10 shadow-sm">
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="mb-1 font-bold">
              Profile Details
            </FieldLegend>
            <FieldDescription className="text-sm text-stone-500 opacity-60">
              Update your shop and personal information
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel>Shop Name</FieldLabel>
                <Input
                  disabled={isUpadating}
                  value={formData.shop_name}
                  onChange={(e) =>
                    setFormData({ ...formData, shop_name: e.target.value })
                  }
                  className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
                />
              </Field>

              <Field>
                <FieldLabel>Owner Name</FieldLabel>
                <Input value={ownerName ?? ""} disabled />
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input value={email ?? ""} disabled />
              </Field>

              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <Input
                  disabled={isUpadating}
                  value={formData.phonenumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phonenumber: e.target.value,
                    })
                  }
                  className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
                />
              </Field>

              <Field>
                <FieldLabel>National ID</FieldLabel>
                <Input value={nic ?? ""} disabled />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button onClick={handleSubmit} className="bg-blue-600 text-white">
              Save Changes
            </Button>
            <Button
              variant="outline"
              disabled={isUpadating}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Field>
        </FieldGroup>
      </div>
    </div>
  );
}

export default BasicDetailsComponent;
