"use client"
import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { toast } from "sonner"; // Assuming you have a toast component for notifications

function CreateBudget() {
    const [emojiIcon, setEmojiIcon] = useState('😀');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage the visibility of the AlertDialog

    const { user } = useUser();

    const handleEmojiClick = (event, emojiObject) => {
        setEmojiIcon(emojiObject.emoji);
        setOpenEmojiPicker(false);
    };

    /* Create new Budget*/
    const onCreateBudget = async () => {
        const result = await db.insert(Budgets)
            .values({
                name: name,
                amount: amount,
                icon: emojiIcon, // Add the icon field here
                createdBy: user?.primaryEmailAddress?.emailAddress
            }).returning({ insertedId: Budgets.id });

        if (result) {
            toast('New Budget Created');
            setIsDialogOpen(false); // Close the dialog after creating the budget
        }
    }

    return (
        <div>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                    <div onClick={() => setIsDialogOpen(true)} className={'bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'}>
                        <h2 className={'text-3xl'}>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Create New Budget</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className={'mt-5'}>
                                <Button variant='outline' size='lg' className='text-lg'
                                        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                                    {emojiIcon}
                                </Button>
                                {openEmojiPicker && (
                                    <div className={'absolute z-10 mt-2'}>
                                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                                    </div>
                                )}
                                <div className={'mt-2'}>
                                    <h2 className={'text-black font-medium my-1'}>Budget Name</h2>
                                    <Input placeholder='e.g Home Decor'
                                           onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className={'mt-2'}>
                                    <h2 className={'text-black font-medium my-1'}>Budget Amount</h2>
                                    <Input placeholder={'e.g 2000€'}
                                           type={'number'}
                                           onChange={(e) => setAmount(e.target.value)} />
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button
                            disabled={!(name && amount)}
                            onClick={onCreateBudget}
                            className={'mt-5 w-full'}>Create Budget</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default CreateBudget;
