'use client'

import { useState, useCallback } from 'react'
import { Upload, Link, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    className?: string
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
    const [mode, setMode] = useState<'url' | 'upload'>('url')
    const [urlInput, setUrlInput] = useState(value)
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleUrlSubmit = () => {
        if (urlInput.trim()) {
            onChange(urlInput.trim())
            setError(null)
        }
    }

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const file = e.dataTransfer.files[0]
        if (file) {
            await uploadFile(file)
        }
    }, [])

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            await uploadFile(file)
        }
    }

    const uploadFile = async (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB')
            return
        }

        setIsUploading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const data = await response.json() as { url: string }
            onChange(data.url)
        } catch (err) {
            setError('Failed to upload image. Please try again or use a URL.')
            console.error('Upload error:', err)
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemove = () => {
        onChange('')
        setUrlInput('')
    }

    return (
        <div className={cn('space-y-3', className)}>
            {/* Mode Toggle */}
            <div className="flex gap-1 rounded-lg bg-secondary/50 p-1 w-fit">
                <button
                    type="button"
                    onClick={() => setMode('url')}
                    className={cn(
                        'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                        mode === 'url'
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <Link className="h-4 w-4" />
                    URL
                </button>
                <button
                    type="button"
                    onClick={() => setMode('upload')}
                    className={cn(
                        'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                        mode === 'upload'
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <Upload className="h-4 w-4" />
                    Upload
                </button>
            </div>

            {/* Preview */}
            {value && (
                <div className="relative inline-block">
                    <img
                        src={value}
                        alt="Cover preview"
                        className="h-40 w-auto rounded-xl object-cover border border-border"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -right-2 -top-2 rounded-full bg-destructive p-1.5 text-white hover:bg-destructive/90 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* URL Input */}
            {mode === 'url' && !value && (
                <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2">
                        <Link className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 bg-transparent placeholder:text-muted-foreground/50 focus:outline-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleUrlSubmit()
                                }
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleUrlSubmit}
                        disabled={!urlInput.trim()}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        Add
                    </button>
                </div>
            )}

            {/* Upload Area */}
            {mode === 'upload' && !value && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        'relative rounded-xl border-2 border-dashed p-8 text-center transition-colors',
                        isDragging
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 hover:bg-secondary/30',
                        isUploading && 'opacity-50 pointer-events-none'
                    )}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploading}
                    />

                    <div className="flex flex-col items-center gap-3">
                        {isUploading ? (
                            <>
                                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                                <p className="text-sm text-muted-foreground">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <div className="rounded-full bg-secondary p-3">
                                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Drag and drop an image here
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        or click to browse • Max 5MB
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    )
}
