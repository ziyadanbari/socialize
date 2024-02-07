import {
  AddPostForm,
  Button,
  Plus,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/exports";

export default function AddPostButton({ children }) {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button>
            {children || (
              <div className="flex items-center gap-2">
                <div>
                  <Plus />
                </div>
                <div>Add Post</div>
              </div>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          className="absolute w-screen h-screen top-0 left-0  bg-black/40 backdrop-blur"
          side={"bottom"}>
          <div className="w-full h-full flex justify-center items-start py-2">
            <AddPostForm />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
