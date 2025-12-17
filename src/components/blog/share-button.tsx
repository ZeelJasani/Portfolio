'use client'

import { useState } from 'react'
import { Share2, X, Copy, Check } from 'lucide-react'
import { createPortal } from 'react-dom'

interface ShareButtonProps {
    title: string
}

export function ShareButton({ title }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareOnTwitter = () => {
        const url = encodeURIComponent(window.location.href)
        const text = encodeURIComponent(title)
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    }

    const shareOnLinkedIn = () => {
        const url = encodeURIComponent(window.location.href)
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <Share2 className="h-4 w-4" />
                Share
            </button>

            {isOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-xl shadow-2xl p-6">
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Header */}
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            Share this blog post
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Share &quot;{title}&quot;
                        </p>

                        {/* Copy Link Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Copy Link
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={typeof window !== 'undefined' ? window.location.href : ''}
                                    className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 truncate"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center justify-center w-11 h-11 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                                >
                                    {copied ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <Copy className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-3">
                                Share on Social Media
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={shareOnTwitter}
                                    className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900">X / Twitter</span>
                                </button>
                                <button
                                    onClick={shareOnLinkedIn}
                                    className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="h-4 w-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900">LinkedIn</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
