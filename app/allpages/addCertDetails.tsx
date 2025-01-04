"use client";

import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import Image from "next/image";


type CardDetails = {
  ssintId: string;
  cardNumber: string;
  cardName: string;
  cardSet: string;
  cardYear: string;
  grade: string;
  additionalInfo: string;
  frontImage: File | string;
  backImage: File | string;
};

export default function AddCertDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(
    null
  );
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null);

  const form = useForm<CardDetails>({
    defaultValues: {
      ssintId: "",
      cardNumber: "",
      cardName: "",
      cardSet: "",
      cardYear: "",
      grade: "",
      additionalInfo: "",
      frontImage: "",
      backImage: "",
    },
  });

  const onSubmit: SubmitHandler<CardDetails> = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const {
        ssintId,
        cardName,
        cardNumber,
        cardSet,
        cardYear,
        grade,
        additionalInfo,
        frontImage,
        backImage,
      } = data;
      formData.append("ssintId", ssintId);
      formData.append("cardName", cardName);
      formData.append("cardNumber", cardNumber);
      formData.append("cardSet", cardSet);
      formData.append("cardYear", cardYear.toString()); // Convert number to string
      formData.append("grade", grade);
      formData.append("additionalInfo", additionalInfo || "");
      formData.append("frontImage", frontImage);
      formData.append("backImage", backImage);

      const response = await fetch("/api/addCertificate", {
        method: "POST",
        body: formData,
      });
      if (response){
      toast.success("Certificate Added Successfully")
      setFrontImagePreview(null);
      setBackImagePreview(null);
      form.reset()

      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === "front") {
          console.log(reader.result);
          setFrontImagePreview(reader.result as string);
          form.setValue("frontImage", file);
        } else {
          setBackImagePreview(reader.result as string);
          form.setValue("backImage", file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold">ssint.</div>
            <div className="text-sm font-medium">Admin Dashboard</div>
          </nav>
        </div>
      </header>
      <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">Add New Card</h1>
          <p className="text-gray-600 text-center mb-8">
            Enter the details for the new card certificate
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ssintId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SSINT ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SSINT ID"
                          {...field}
                          required
                          // pattern="SSINT-\d{3}"
                          // title="SSINT ID must be in format SSINT-XXX where X is a number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Card Number"
                          {...field}
                          required
                          // pattern="CARD-\d+"
                          // title="Card number must start with CARD- followed by numbers"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Card Name"
                          {...field}
                          required
                          minLength={2}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardSet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Set</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Card Set"
                          {...field}
                          required
                          minLength={2}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Year"
                          {...field}
                          required
                          pattern="\d{4}"
                          // title="Please enter a valid year (YYYY)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <Input placeholder="Grade" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional information about the card..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="frontImage"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Front Image</FormLabel>
                      <FormControl>
                        <div className="flex flex-col items-start">
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="frontImage"
                            onChange={(e) => handleImageUpload(e, "front")}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("frontImage")?.click()
                            }
                            className="mb-2"
                          >
                            Upload Front Image
                          </Button>
                          {frontImagePreview && (
                            <Image
                              src={frontImagePreview}
                              alt="Front of card"
                              className="mt-2 max-w-full h-auto max-h-40 object-contain"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload the front image of the card
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backImage"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Back Image</FormLabel>
                      <FormControl>
                        <div className="flex flex-col items-start">
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="backImage"
                            onChange={(e) => handleImageUpload(e, "back")}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("backImage")?.click()
                            }
                            className="mb-2"
                          >
                            Upload Back Image
                          </Button>
                          {backImagePreview && (
                            <Image
                              src={backImagePreview}
                              alt="Back of card"
                              className="mt-2 max-w-full h-auto max-h-40 object-contain"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload the back image of the card
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Card Details"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
