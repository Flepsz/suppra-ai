"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Heading from "@/components/heading";
import { Code } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import ReactMarkdown from "react-markdown";

export default function CodePage() {
	const router = useRouter();
	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionMessageParam = {
				role: "user",
				content: values.prompt,
			};
			const newMessages = [...messages, userMessage];

			const response = await axios.post("/api/code", {
				messages: newMessages,
			});

			setMessages((current) => [...current, userMessage, response.data]);

			form.reset();
		} catch (error: any) {
			// TODO: Open Pro Modal
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Code Generation"
				description="Generate code, monkey..."
				icon={Code}
				iconColor="text-green-700"
				bgColor="text-green-700/10"
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="p-0 m-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												disabled={isLoading}
												placeholder="How can I centralize a div?"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="w-full col-span-12 lg:col-span-2"
								disabled={isLoading}
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="mt-4 space-y-4">
					{isLoading && (
						<div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<Empty label="No conversation started" />
					)}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									"p-8 w-full flex items-start gap-x-8 rounded-lg",
									message.role === "user"
										? "bg-white border border-black/10"
										: "bg-muted"
								)}
							>
								{message.role === "user" ? <UserAvatar /> : <BotAvatar />}
								<ReactMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div className="w-full p-2 my-2 overflow-auto rounded-lg bg-black/10">
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code className="p-1 rounded-lg bg-black/10" {...props} />
										)
									}}
									className="overflow-hidden text-sm leading-7"
								>
									{message.content || ""}
								</ReactMarkdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
