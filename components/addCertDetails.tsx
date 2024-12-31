'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Toast } from "./ui/use-toast"


 type CardDetails = {
    ssintId: string;
    cardNumber: string;
    cardName: string;
    cardSet: string;
    cardYear: string;
    grade: string;
    additionalInfo: string;
    frontImage?: string;
    backImage?: string;
  }

export default function AddCertDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
  })

  const onSubmit: SubmitHandler<CardDetails> = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(data)
      Toast({
        title: "Card details saved",
        // description: "The card details have been successfully saved.",
      })
      form.reset()
    } catch (error) {
      Toast({
        title: "Error",
        // description: "There was an error saving the card details.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold">ssint.</div>
            <div className="text-sm font-medium">Admin Dashboard</div>
          </nav>
        </div>
      </header>

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
                          placeholder="SSINT-001" 
                          {...field} 
                          required
                          pattern="SSINT-\d{3}"
                          title="SSINT ID must be in format SSINT-XXX where X is a number"
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
                          placeholder="CARD-12345" 
                          {...field} 
                          required
                          pattern="CARD-\d+"
                          title="Card number must start with CARD- followed by numbers"
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
                          placeholder="Charizard VMAX" 
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
                          placeholder="Champion's Path" 
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
                          placeholder="2020" 
                          {...field} 
                          required
                          pattern="\d{4}"
                          title="Please enter a valid year (YYYY)"
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
                        <Input 
                          placeholder="PSA 10" 
                          {...field} 
                          required
                        />
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Front Image URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://..." 
                          {...field}
                          type="url"
                          title="Please enter a valid URL"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the URL for the front image of the card
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
                      <FormLabel>Back Image URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://..." 
                          {...field}
                          type="url"
                          title="Please enter a valid URL"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the URL for the back image of the card
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
  )
}


