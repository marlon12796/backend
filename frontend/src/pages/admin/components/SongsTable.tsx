import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMusicStore } from '@/stores/useMusicStore';
import { Calendar, Trash2 } from 'lucide-react';
import { SongsTableSkeleton } from './SongsTableSkeleton';

const SongsTable = () => {
	const { songs, isLoading, error, deleteSong } = useMusicStore();

	if (error) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-red-400'>{error}</div>
			</div>
		);
	}

	return isLoading ? (
		<SongsTableSkeleton />
	) : (
		<Table className='min-h-60 min-w-[37rem]'>
			<TableHeader className=''>
				<TableRow className='[padding-block-start:0.5em] items-center hover:bg-zinc-800/50 '>
					<TableHead className='w-[90px]'></TableHead>
					<TableHead className='grow w-44 max-w-72'>Title</TableHead>
					<TableHead className='grow w-60'>Artist</TableHead>
					<TableHead className='grow w-32'>Release Date</TableHead>
					<TableHead className='w-24 text-center'>Actions</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{songs.map((song) => (
					<TableRow key={song._id} className='hover:bg-zinc-800/50 items-center [padding-block:0.2em]'>
						<TableCell className='w-[90px]'>
							<img src={song.imageUrl} alt={song.title} className='size-10 rounded object-cover' />
						</TableCell>
						<TableCell className='font-medium grow flex justify-start w-44 max-w-72'>{song.title}</TableCell>
						<TableCell className='grow flex justify-start w-60 '>{song.artist}</TableCell>
						<TableCell className='grow w-32 flex justify-start'>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{song.createdAt.split('T')[0]}
							</span>
						</TableCell>

						<TableCell className='text-right w-24'>
							<div className='flex gap-2 justify-center'>
								<Button
									variant={'ghost'}
									size={'sm'}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
									onClick={() => deleteSong(song._id)}
								>
									<Trash2 className='size-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export default SongsTable;
