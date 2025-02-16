
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export const SongsTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[60px]"></TableHead>
          <TableHead className="grow">Title</TableHead>
          <TableHead className="grow">Artist</TableHead>
          <TableHead className=" grow max-w-52">Release Date</TableHead>
          <TableHead className="w-24 text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 7 }).map((_, i) => (
          <TableRow key={i} className="hover:bg-zinc-800/50 animate-pulse items-center" aria-hidden="true">
            <TableCell className="w-[90px]">
              <div className="size-10 rounded bg-zinc-700" />
            </TableCell>
            <TableCell className="font-medium grow">
              <div className="h-4 bg-zinc-700 rounded w-full" />
            </TableCell>
            <TableCell className="grow">
              <div className="h-4 bg-zinc-700 rounded w-full" />
            </TableCell>
            <TableCell className="grow max-w-52">
              <div className="h-4 bg-zinc-700 rounded w-full" />
            </TableCell>
            <TableCell className="text-right w-24">
              <div className="size-6 bg-zinc-700 rounded m-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};