"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock } from "lucide-react";

export function SelectResumeFormat() {
  const [selected, setSelected] = useState("standard");
  const [openUpgrade, setOpenUpgrade] = useState(false);

  const formats = [
    { id: "standard", name: "Standard", locked: false },
    { id: "modern", name: "Modern", locked: true },
    { id: "minimal", name: "Minimal", locked: true },
    { id: "corporate", name: "Corporate", locked: true },
    { id: "creative", name: "Creative", locked: true },
    { id: "executive", name: "Executive", locked: true },
  ];

  const handleSelect = (format) => {
    if (format.locked) {
      setOpenUpgrade(true);
    } else {
      setSelected(format.id);
    }
  };

  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Select Resume Format</Button>
        </DrawerTrigger>

        <DrawerContent className="w-[400px]">
          <DrawerHeader>
            <DrawerTitle>Select Resume Format</DrawerTitle>
            <DrawerDescription>
              Choose your resume template
            </DrawerDescription>
          </DrawerHeader>

          {/* Format Grid */}
          <div className="grid grid-cols-2 gap-4 px-4 pb-6">
            {formats.map((format) => (
              <div
                key={format.id}
                onClick={() => handleSelect(format)}
                className={`
                  relative cursor-pointer rounded-xl border p-6 text-center
                  transition-all duration-200
                  ${
                    selected === format.id && !format.locked
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200"
                  }
                  hover:shadow-md
                `}
              >
                <p className="font-medium">{format.name}</p>

                {format.locked && (
                  <div className="absolute top-2 right-2 text-gray-400">
                    <Lock size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <DrawerFooter>
            <Button>Apply Format</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Upgrade Dialog */}
      <Dialog open={openUpgrade} onOpenChange={setOpenUpgrade}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade Required</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            This resume format is available in higher packages.  
            Please upgrade your plan to unlock premium templates.
          </p>

          <Button
            className="mt-4 w-full"
            onClick={() => setOpenUpgrade(false)}
          >
            View Plans
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}