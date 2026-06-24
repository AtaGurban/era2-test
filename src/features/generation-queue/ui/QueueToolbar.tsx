import { useQueueFilterSort } from "../model/useQueueFilterSort";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { SortOrder } from "../model/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const QueueToolbar = () => {
  const {
    setStatusFilter,
    sortOrder,
    setSortOrder,
    filterOptionsWithActive,
    sortOptionsWithActive,
    activeSortLabel,
  } = useQueueFilterSort();

  return (
    <div className="py-4 w-full overflow-hidden">
      <Swiper
        slidesPerView="auto"
        spaceBetween={8}
        className="w-full"
      >
        {filterOptionsWithActive.map((option) => (
          <SwiperSlide key={option.value} className="!w-auto">
            <Button
              variant="ghost"
              onClick={() => setStatusFilter(option.value)}
              className={cn(
                "rounded-full h-auto py-2 px-4 transition-colors",
                option.isActive
                  ? "bg-[#E25424] text-white hover:bg-[#E25424]/90 hover:text-white"
                  : "bg-[#1E1B1A] text-zinc-400 hover:text-zinc-200 hover:bg-[#2A2624]"
              )}
            >
              {option.label}
            </Button>
          </SwiperSlide>
        ))}

        <SwiperSlide className="w-auto!">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-4 py-2 h-auto text-zinc-300 bg-[#1E1B1A] rounded-full hover:bg-[#2A2624] hover:text-zinc-200 transition-colors"
              >
                {activeSortLabel}
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[180px] bg-[#1E1B1A] border-zinc-800 text-zinc-300 z-[100]"
            >
              <DropdownMenuRadioGroup
                value={sortOrder}
                onValueChange={(val: string) => setSortOrder(val as SortOrder)}
              >
                {sortOptionsWithActive.map((opt) => (
                  <DropdownMenuRadioItem
                    key={opt.value}
                    value={opt.value}
                    className="focus:bg-[#2A2624] focus:text-white cursor-pointer"
                  >
                    {opt.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
