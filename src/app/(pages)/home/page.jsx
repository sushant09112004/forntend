import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResumeUplaodDailog from "@/components/Home/ResumeUplaodDailog";
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="grid gap-6 w-full max-w-4xl md:grid-cols-3">
        {/* Upload Resume */}
        <Card className="hover:shadow-lg transition cursor-pointer">
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
            <CardDescription>
              Upload your existing resume and continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResumeUplaodDailog/>
          </CardContent>
        </Card>

        {/* Edit From Scratch */}
        <Card className="hover:shadow-lg transition cursor-pointer">
          <CardHeader>
            <CardTitle>Edit from Scratch</CardTitle>
            <CardDescription>
              Create a new resume by filling a form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Start from Scratch
            </Button>
          </CardContent>
        </Card>

        {/* Not Decided */}
        <Card className="hover:shadow-lg transition cursor-pointer">
          <CardHeader>
            <CardTitle>Not Decided Yet</CardTitle>
            <CardDescription>Explore options and decide later</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">
              Decide Later
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
