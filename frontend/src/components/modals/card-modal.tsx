import { Dialog } from "@/components/ui/dialog"
import { DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";

export const CardModal = () => {

    const data = useCardModal((state) => state.card);
    const list = useCardModal((state) => state.list) ?? '';
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent title="test" className="bg-[#121212] border border-[#282828]">
                <Header data={data} list={list}/>
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            <Description data={data} />
                            {/* <Activity items={testLogs} /> */}
                        </div>
                    </div>
                    <Actions data={data}/>
                </div>
            </DialogContent>
        </Dialog>
    );
};