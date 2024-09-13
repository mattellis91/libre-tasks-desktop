import { Dialog } from "@/components/ui/dialog"
import { DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { Activity } from "./activity";
import { createId } from "@paralleldrive/cuid2";

export const CardModal = () => {

    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    const testData = {
        id: id,
        title: "card modal",
        description: "sdfsdf",
        list: {
            title: "list title"
        }
    }

    const testLogs = [
        {
            id: createId(),
            title: "test log"
        }
    ]

    //TODO: get card details from somewhere

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent title="test" className="bg-[#121212] border border-[#282828]">
                <Header data={testData}/>
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            <Description data={testData} />
                            <Activity items={testLogs} />
                        </div>
                    </div>
                    <Actions data={testData}/>
                </div>
            </DialogContent>
        </Dialog>
    );
};