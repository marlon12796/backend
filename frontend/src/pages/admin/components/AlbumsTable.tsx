import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const AlbumsTable = () => {
	const { albums, deleteAlbum, fetchAlbums } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	return (
		<Table className="min-h-44">
			<TableHeader>
				<TableRow className='[padding-block-start:0.5em] items-center hover:bg-zinc-800/50'>
					<TableHead className='w-[70px]'></TableHead>
					<TableHead className="grow max-w-64">Title</TableHead>
					<TableHead className="grow">Artist</TableHead>
					<TableHead className="grow max-w-52">Release Year</TableHead>
					<TableHead className="grow max-w-64">Songs</TableHead>
					<TableHead className='text-right w-20'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{albums.map((album) => (
					<TableRow key={album._id} className='items-center hover:bg-zinc-800/50'>
						<TableCell className='w-[70px]'>
							<img src={album.imageUrl} alt={album.title} className='w-10 h-10 rounded object-cover' />
						</TableCell>
						<TableCell className='font-medium grow max-w-64'>{album.title}</TableCell>
						<TableCell className="grow">{album.artist}</TableCell>
						<TableCell className="grow max-w-52">
							<span className='inline-flex items-center gap-1 w-full text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{album.releaseYear}
							</span>
						</TableCell>
						<TableCell className="grow max-w-64">
							<span className='inline-flex w-full items-center gap-1 text-zinc-400'>
								<Music className='h-4 w-4' />
								{album.songs.length} songs
							</span>
						</TableCell>
						<TableCell className='text-right w-20'>
							<div className='flex gap-2 justify-end w-full'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => deleteAlbum(album._id)}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export default AlbumsTable;
