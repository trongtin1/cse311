import { Dialog, DialogContent } from "@/components/ui/dialog";
import SearchInput from "./SearchInput";
import GenreDropDown from "./GenreDropDown";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#191919] border-none p-6 !top-24 !translate-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <SearchInput onClose={onClose} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
