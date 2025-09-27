"use client";

import type React from "react";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {
  Upload,
  ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
  CreditCardIcon as CardIcon,
  Sparkles,
} from "lucide-react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useController } from "react-hook-form";

type CardDetails = {
  ssintId: string;
  frontImage: File | null;
  backImage: File | null;
};

export default function AddCertImages() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(
    null
  );
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState({ front: false, back: false });

  const form = useForm<CardDetails>({
    defaultValues: {
      ssintId: "",
      frontImage: null,
      backImage: null,
    },
  });

  const onSubmit: SubmitHandler<CardDetails> = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const { ssintId, frontImage, backImage } = data;
      formData.append("ssintId", ssintId);
      formData.append("frontImage", frontImage as File);
      formData.append("backImage", backImage as File);
      
console.log({formData});

      const response = await fetch("/api/add-cert-image", {
        method: "POST",
        body: formData,
      });
      const responseVal = await response.json();

      if (responseVal === "Added") {
        toast.success("Certificate Added Successfully", {
          icon: <CheckCircle className="w-5 h-5" />,
        });
        setFrontImagePreview(null);
        setBackImagePreview(null);
        form.reset();
      } else if (responseVal === "Exist") {
        toast.error("Certificate Already Exists", {
          icon: <AlertCircle className="w-5 h-5" />,
        });
      } else {
        toast.error("Failed to add certificate", {
          icon: <AlertCircle className="w-5 h-5" />,
        });
      }
    } catch (error) {
      toast.error(`Error: ${error}`, {
        icon: <AlertCircle className="w-5 h-5" />,
      });
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
      processFile(file, side);
    }
  };

  const processFile = (file: File, side: "front" | "back") => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (side === "front") {
        setFrontImagePreview(reader.result as string);
        form.setValue("frontImage", file);
      } else {
        setBackImagePreview(reader.result as string);
        form.setValue("backImage", file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent, side: "front" | "back") => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive({ ...dragActive, [side]: true });
    } else if (e.type === "dragleave") {
      setDragActive({ ...dragActive, [side]: false });
    }
  };

  const handleDrop = (e: React.DragEvent, side: "front" | "back") => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive({ ...dragActive, [side]: false });

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0], side);
    }
  };




  const ImageUploadArea = ({
    side,
    preview,
   
    label,
  }: {
    side: "front" | "back";
    preview: string | null;
    
    label: string;
  }) => {

    useController({
      name: `${side}Image`,
      control: form.control,
      rules: {
        required: "Image is required", // ✅ RHF handles it
      },
    });
    return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
          dragActive[side]
            ? "border-blue-500 bg-blue-50 scale-105"
            : preview
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
        onDragEnter={(e) => handleDrag(e, side)}
        onDragLeave={(e) => handleDrag(e, side)}
        onDragOver={(e) => handleDrag(e, side)}
        onDrop={(e) => handleDrop(e, side)}
      >
        <Input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id={`${side}Image`}
          onChange={(e) => handleImageUpload(e, side)}
        
          
          
        />

        {preview ? (
          <div className="relative p-4">
            <img
              src={preview || "/placeholder.svg"}
              alt={`${label} of card`}
              className="w-full h-48 object-contain rounded-lg bg-white shadow-sm"
            />
         
            <Badge
              variant="secondary"
              className="absolute bottom-2 left-2 bg-green-100 text-green-800"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Uploaded
            </Badge>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div
              className={`p-4 rounded-full mb-4 transition-colors ${
                dragActive[side] ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <Upload
                className={`w-8 h-8 ${
                  dragActive[side] ? "text-blue-600" : "text-gray-600"
                }`}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload {label} Image
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Drag and drop your image here, or click to browse
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="pointer-events-none bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ssint.
                </div>
                <div className="text-xs text-gray-500">Trading Cards</div>
              </div>
            </div>
            <Badge variant="outline" className="bg-white/50">
              <CardIcon className="w-3 h-3 mr-1" />
              Admin Dashboard
            </Badge>
          </nav>
        </div>
      </header>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        className="mt-16"
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6">
              <CardIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Add New Trading Card
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload high-quality images and enter the SSINT ID to create a new
              trading card certificate
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl text-center text-gray-800">
                Card Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* SSINT ID Field */}
                  <FormField
                    control={form.control}
                    name="ssintId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800">
                          SSINT ID
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter SSINT ID (e.g., SSINT-001)"
                              className="h-12 text-lg pl-4 pr-12 border-2 focus:border-blue-500 transition-colors"
                              {...field} //set and get field values
                              required
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <Badge variant="secondary" className="text-xs">
                                ID
                              </Badge>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-gray-600">
                          Unique identifier for the trading card
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image Upload Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="frontImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                            <ImageIcon className="w-5 h-5 mr-2" />
                            Front Image
                          </FormLabel>
                          <FormControl>
                            <ImageUploadArea
                              side="front"
                              preview={frontImagePreview}
                              
                              label="Front"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-600">
                            Upload the front side of the trading card
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="backImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                            <ImageIcon className="w-5 h-5 mr-2" />
                            Back Image
                          </FormLabel>
                          <FormControl>
                            <ImageUploadArea
                              side="back"
                              preview={backImagePreview}
                             
                              label="Back"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-600">
                            Upload the back side of the trading card
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-3" />
                          Save Card Details
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Info Cards */}
       
        </div>
      </main>
    </div>
  );
}
