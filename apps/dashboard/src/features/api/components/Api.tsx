'use client'

import { AlertTriangle, Calendar, Check, Copy, Key, RefreshCw, ShieldAlert, ShieldCheck, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useGenerateApiKeyMutation } from '../hooks/mutation/useGenerateApiKeyMutation'
import { useGetApiKeyQuery } from '../hooks/query/useGetApiKeyQuery'

// Assuming your Query returns this shape. Adjust if necessary.
interface UserApiKeyData {
  partialKey: string // e.g., "sk_live_...a1b2"
  createdAt: string
  id: string
}

const Api = () => {
  // 1. Query for existing key (Persisted data)
  const { data: userApiKey, refetch: refetchKey, isLoading: isQueryLoading } = useGetApiKeyQuery()

  // 2. Mutation to create new key
  const { mutate: generateKey, isPending: isGenerating } = useGenerateApiKeyMutation()

  // 3. Local state for the "One-Time View" (Only populated immediately after creation)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  // --- Handlers ---

  const handleCreateKey = () => {
    generateKey(undefined, {
      onSuccess: (fullKeyResponse) => {
        // Assume mutation returns the full string, e.g., "sk_live_12345..."
        setGeneratedKey(fullKeyResponse)
        // Refetch the query so the background updates with the new partial key/date
        refetchKey()
      },
    })
  }

  const handleDoneViewing = () => {
    // Clear the sensitive data from local state to switch to "Partial View"
    setGeneratedKey(null)
  }

  // Placeholder for revocation (You likely need a useRevokeApiKeyMutation here)
  const handleRevokeKey = () => {
    if (confirm('Are you sure? This will immediately break any applications using this key.')) {
      // Call your delete mutation here
      console.log('Revoking key...')
      // After success, setGeneratedKey(null) and refetchKey()
    }
  }

  const copyToClipboard = () => {
    if (!generatedKey) return
    navigator.clipboard.writeText(generatedKey)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="min-h-screen rounded-xl bg-zinc-950 px-10 text-zinc-100 selection:bg-violet-500/30">
      {/* --- Ambient Background Effects --- */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[10%] left-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto space-y-10 px-6 py-10 lg:px-8">
        {/* --- Page Header --- */}
        <div className="flex flex-col gap-2 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-violet-400">
            <span className="text-xs font-semibold tracking-wide uppercase">Developer Settings</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">API Configuration</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
            Manage your secret API keys. You can only have <strong>one active key</strong> per account.
          </p>
        </div>

        {/* --- Main Action Card --- */}
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-5">
            <div>
              <h3 className="text-base font-semibold text-white">Live Secret Key</h3>
              <p className="mt-1 text-sm text-zinc-500">Used for server-side API requests.</p>
            </div>
            {/* Show 'Active' badge if a key exists (either newly generated or from DB) */}
            {(userApiKey || generatedKey) && (
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span className="text-xs font-medium tracking-wide text-emerald-400 uppercase">Active</span>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            {/* ---------------------------------------------------------------------------
               SCENARIO 1: RAW KEY JUST CREATED (The "One Time" View)
               --------------------------------------------------------------------------- */}
            {generatedKey ? (
              <div className="animate-in zoom-in-95 space-y-6 duration-300">
                {/* Warning Box */}
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-amber-200">Save your key securely</h4>
                      <p className="text-xs leading-relaxed text-amber-200/70">
                        This is the only time we will show you the full API key. Make sure to copy it now.
                        <strong className="text-amber-200"> You will not be able to see it again.</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Key Display */}
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wider text-zinc-400 uppercase">New Secret Key</label>
                  <div className="group relative">
                    <div className="flex w-full items-center rounded-lg border border-violet-500/50 bg-black/60 px-4 py-3 font-mono text-sm text-white shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                      {generatedKey}
                    </div>

                    <div className="absolute top-2 right-2 bottom-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex h-full items-center gap-2 rounded-md bg-zinc-800 px-3 text-xs font-medium text-white transition-colors hover:bg-zinc-700"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleDoneViewing}
                    className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-zinc-900 shadow transition-colors hover:bg-zinc-200"
                  >
                    I have stored my key
                  </button>
                </div>
              </div>
            ) : /* ---------------------------------------------------------------------------
               SCENARIO 2: KEY ALREADY EXISTS (The "Partial" View)
               --------------------------------------------------------------------------- */
            userApiKey ? (
              <div className="animate-in fade-in space-y-6 duration-500">
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wider text-zinc-400 uppercase">Active API Key</label>
                  <div className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 font-mono text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                      {/* We display the partial key from the DB */}
                      <span className="text-zinc-300">{userApiKey.partialKey}</span>
                    </div>
                    {/* Optional: Lock icon to show it's obscured */}
                    <div className="flex items-center gap-1.5 rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-400">
                      Hidden
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-zinc-900/30 p-3">
                  <Calendar className="h-4 w-4 text-zinc-500" />
                  <p className="text-xs text-zinc-400">
                    Created on{' '}
                    <span className="text-zinc-300">{new Date(userApiKey.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>

                <div className="mt-6 border-t border-white/5 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium text-red-200">Danger Zone</h4>
                      <p className="text-xs text-red-200/50">Revoke this key to generate a new one.</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300">
                      <Trash2 className="h-3.5 w-3.5" />
                      Revoke Key
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ---------------------------------------------------------------------------
               SCENARIO 3: NO KEY (Empty State)
               --------------------------------------------------------------------------- */
              <div className="flex flex-col items-center justify-center space-y-6 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 shadow-inner">
                  <ShieldAlert className="h-8 w-8 text-zinc-600" />
                </div>
                <div className="max-w-md space-y-2">
                  <h4 className="text-lg font-medium text-white">No active API key found</h4>
                  <p className="text-sm text-zinc-500">
                    Generate a key to start integrating. You will only be able to view the full key once upon creation.
                  </p>
                </div>
                <button
                  onClick={handleCreateKey}
                  disabled={isGenerating || isQueryLoading}
                  className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-105 hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Key className="h-4 w-4" />
                      Create Secret Key
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Api
