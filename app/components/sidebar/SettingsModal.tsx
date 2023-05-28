'use client';

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
    currentUser: User;
    isOpen?: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    currentUser,
    isOpen,
    onClose
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        formState: {
            errors
        },
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, { shouldValidate: true })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/settings', data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="pb-12 border-b border-gray-900/10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Edit your public information
                        </p>

                        <div className="flex flex-col mt-10 gap-y-8">
                            <Input disabled={isLoading} label="Name" id="name" errors={errors} required register={register} />
                            <div >
                                <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                <div className="flex items-center mt-2 gap-x-3">
                                    <Image width='48' height='48' className="rounded-full" src={image || currentUser?.image || '/images/placeholder.jpg'} alt='Avatar' />
                                    <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='igo5mqhq'>
                                        <Button disabled={isLoading} secondary type='button'>
                                            Change
                                        </Button>
                                    </CldUploadButton>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="flex items-center justify-end mt-6 gap-x-6">
                        <Button disabled={isLoading} type='button' secondary onClick={onClose}>
                            Cancel
                        </Button>

                        <Button disabled={isLoading} type='submit' >
                            Save
                        </Button>

                    </div>
                </div>

            </form>

        </Modal>

    );
}

export default SettingsModal;