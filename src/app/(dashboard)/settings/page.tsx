"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

const DELETE_CONFIRM_TEXT = "delete my account";

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const currentName = session?.user?.name ?? "";

  async function handleUpdateName() {
    if (!name.trim() || name.trim() === currentName) return;
    setIsUpdatingName(true);
    try {
      const { error } = await authClient.updateUser({ name: name.trim() });
      if (error) {
        toast.error(error.message ?? "Failed to update name.");
      } else {
        toast.success("Name updated successfully.");
        setName("");
        router.refresh();
      }
    } catch {
      toast.error("Failed to update name.");
    } finally {
      setIsUpdatingName(false);
    }
  }
  async function handleDeleteAccount() {
    if (deleteConfirm !== DELETE_CONFIRM_TEXT) return;
    setIsDeletingAccount(true);
    const { error } = await authClient.deleteUser({ callbackURL: "/sign-in" });
    setIsDeletingAccount(false);
    if (error) {
      toast.error(error.message ?? "Failed to delete account.");
    } else {
      setDialogOpen(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account settings.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Update name */}
          <div className="space-y-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Account
            </p>
            <div className="space-y-2">
              <Label htmlFor="name">Update your name</Label>

              <div className="flex justify-between gap-2">
                <Input
                  id="name"
                  placeholder="Enter new name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUpdateName()}
                />
                <Button
                  onClick={handleUpdateName}
                  disabled={
                    isUpdatingName ||
                    !name.trim() ||
                    name.trim() === currentName
                  }
                  size="sm"
                >
                  {isUpdatingName ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Danger zone */}
          <div className="space-y-4">
            <p className="text-xs font-medium text-destructive uppercase tracking-wide">
              Danger Zone
            </p>

            <AlertDialog
              open={dialogOpen}
              onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) setDeleteConfirm("");
              }}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete account</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your account and all associated
                    data including repositories and reviews. This action cannot
                    be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-2 py-2">
                  <Label htmlFor="delete-confirm">
                    Type{" "}
                    <span className="font-mono text-destructive font-medium">
                      {DELETE_CONFIRM_TEXT}
                    </span>{" "}
                    to confirm
                  </Label>
                  <Input
                    id="delete-confirm"
                    placeholder={DELETE_CONFIRM_TEXT}
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                  />
                </div>

                <AlertDialogFooter className="border-t-0 pt-0 bg-transparent">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      setDeleteConfirm("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={
                      isDeletingAccount || deleteConfirm !== DELETE_CONFIRM_TEXT
                    }
                  >
                    {isDeletingAccount ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Delete my account"
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
