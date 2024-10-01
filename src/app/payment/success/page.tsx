import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="flex w-full justify-center">
            <Check className="size-12 rounded-full bg-green-500/30 p-2 text-green-500" />
          </div>

          <div className="mt-3 w-full text-center sm:mt-5">
            <h3 className="text-lg font-medium leading-6">
              Payment Successfull
            </h3>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                Congrats on your subscription, please check your email for
                further instructions
              </p>
            </div>

            <div className="mt-5 w-full sm:mt-6">
              <Button className="w-full" asChild>
                <Link href="/">Go back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
