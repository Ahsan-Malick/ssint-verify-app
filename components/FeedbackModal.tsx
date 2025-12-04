"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "react-toastify"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { X } from "lucide-react"
import RiseLoader from "react-spinners/RiseLoader"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !feedback.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          feedback,
          timestamp: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Thank you for your feedback!")
        setEmail("")
        setFeedback("")
        onClose()
      } else {
        toast.error(data.error || "Failed to submit feedback")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Share Your Feedback</h2>
          <p className="text-emerald-100 text-sm mt-1">Help us improve the AI Grading System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Email field */}
          <div>
            <label htmlFor="feedback-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              id="feedback-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
              disabled={loading}
            />
          </div>

          {/* Feedback field */}
          <div>
            <label htmlFor="feedback-text" className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              id="feedback-text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your suggestions or concerns about the AI grading system..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none resize-none"
              disabled={loading}
            />
          </div>

          {/* Submit button */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={loading}
            >
              Cancel
            </Button>
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <RiseLoader size={8} color="#10b981" loading={loading} />
              </div>
            ) : (
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold"
              >
                Submit Feedback
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
