"use client";
import React from "react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import { Inter, Montserrat } from "next/font/google";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import RiseLoader from "react-spinners/RiseLoader";

const montserrat = Montserrat({ subsets: ["latin"] });

const CertInputPage = () => {
  const [ssintId, setSsintId] = useState("");
  const [certLoading, setCertLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCertLoading(true);
    const response = await fetch(`/api/getCertificate/${ssintId}`); //returns a promise
    const data = await response.json();
    const certDetails = data.certDetails;

    // Navigate to the certificate page with query params
    if (response.status === 200) {    
      router.push(
        `/certificate?certDetails=${encodeURIComponent(
          JSON.stringify(certDetails)
        )}`
      );
      setCertLoading(false);
    } else {
      toast.error("Something went wrong while getting certificate");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Top Banner */}
        <div className="w-full bg-[#f5f5f5] py-2">
          <div className="container mx-auto flex justify-between sm:flex sm:justify-between items-center px-2">
            <div className=" flex gap-2 sm:flex sm:gap-4">
              <SocialIcon
                style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                url="https://x.com/ssintgrading"
              />
              {/* Facebook */}
              <SocialIcon
                style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                url="https://www.facebook.com/profile.php?id=61558980641303"
              />

              {/* TikTok */}
              <SocialIcon
                style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                url="https://www.tiktok.com/@ssintgrading"
              />

              {/* YouTube */}
              <SocialIcon
                style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                url="https://www.youtube.com/@ssintgrading"
              />

              {/* Instagram */}
              <SocialIcon
                style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                url="https://www.instagram.com/ssintgrading"
              />
            </div>
            <div className="text-[10px] sm:text-sm text-gray-600">
              <a
                href="https://ssintgrading.com/products/new-grading-standard-service"
                target="_blank"
                rel="noopener noreferrer"
              >
                SUBMIT HERE →
              </a>
            </div>
          </div>
        </div>

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
          transition={Bounce}
        />
        {/* Logo */}
        <div className="container mx-auto flex justify-center items-center py-4 px-4">
          <Image
            src="/ssintLogo.png" // Path to the logo in the public folder
            alt="SSINT Logo"
            width={120} // Set the width
            height={50} // Set the height
            priority
          ></Image>
        </div>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1
              className={`text-5xl font-bold text-black tracking-wide ${montserrat.className}`}
            >
              Your Collection, Elevated
            </h1>
            <p
              className={`text-gray-600 text-lg tracking-widest uppercase font-normal ${montserrat.className}`}
            >
              SPECIALISED SERVICES IN INSPECTION AND NOTATION OF TREASURES
            </p>

            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-4"
            >
              <Input
                type="text"
                placeholder="Enter SSINT ID"
                value={ssintId}
                onChange={(e) => setSsintId(e.target.value)}
                className="w-full border-gray-200 text-black placeholder-gray-400"
              />
              {certLoading ? (
                <RiseLoader
                  size={10}
                  color="red"
                  loading={certLoading}
                ></RiseLoader>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-md transition-colors"
                >
                  Check Certificate
                </Button>
              )}
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default CertInputPage;
