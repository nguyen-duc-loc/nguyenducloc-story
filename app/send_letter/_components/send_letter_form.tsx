"use client";

import * as emoji from "node-emoji";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SendLetterData, SendLetterSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";
import { sendLetter } from "@/lib/api/letter";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

const anonymousUser = "Người gửi ẩn danh";

const SendLetterForm = () => {
  const [user, setUser] = React.useState<string>(anonymousUser);
  const [isDialogOpen, seIsDialLogOpen] = React.useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(SendLetterSchema),
    defaultValues: {
      sender: user,
      content: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onUserChange = (value: string) => {
    if (value === anonymousUser) {
      setUser(value);
      form.setValue("sender", value);
      form.clearErrors("sender");
    } else {
      setUser("");
      form.setValue("sender", "");
    }
  };

  const onSubmit = async (data: SendLetterData) => {
    const response = await sendLetter(data);
    if (response.success) {
      setUser(anonymousUser);
      form.reset();
      seIsDialLogOpen(true);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen}>
        <DialogContent className="[&>button:first-of-type]:hidden">
          <p>Cảm ơn cậu đã dành thời gian viết cho nguyenducloc.</p>
          <p>
            Mong thế giới này sẽ đối xử với cậu theo cách dịu dàng nhất . Love
            you {emoji.emojify(":heart:")}.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => seIsDialLogOpen(false)}
              >
                <X />
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Form {...form}>
        <RadioGroup
          defaultValue={anonymousUser}
          onValueChange={onUserChange}
          value={user}
          className="mb-8"
          disabled={isSubmitting}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value={anonymousUser} id="user-anonymous" />
            <Label htmlFor="user-anonymous">Cho tớ ẩn danh</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="" id="normal-user" />
            <Label htmlFor="normal-user">
              Tớ không ngại tiết lộ danh tính đâu
            </Label>
          </div>
        </RadioGroup>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="sender"
            render={({ field }) => (
              <FormItem>
                {user !== anonymousUser && (
                  <FormLabel>
                    Có thể cho tớ bít tên của cậu hong {emoji.emojify(":eyes:")}{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                )}
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    className="h-10"
                    type={user === anonymousUser ? "hidden" : "text"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Điều cậu muốn gửi đến tớ {emoji.emojify(":thinking:")}{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isSubmitting}
                    className="h-40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button disabled={isSubmitting} className="ml-auto w-fit">
              {isSubmitting ? <Spinner /> : <Send />}
              Thân gửi
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SendLetterForm;
