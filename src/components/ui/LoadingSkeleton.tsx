import { memo } from 'react';
import { Skeleton, TableCell, TableRow, Box } from '@mui/material';

interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
}

export const LoadingSkeleton = memo(function LoadingSkeleton({
  rows = 5,
  columns = 4,
}: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton animation="wave" height={30} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
});

export const LoadingCard = memo(function LoadingCard() {
  return (
    <Box sx={{ p: 2 }}>
      <Skeleton animation="wave" height={40} sx={{ mb: 2 }} />
      <Skeleton animation="wave" height={60} sx={{ mb: 1 }} />
      <Skeleton animation="wave" height={60} sx={{ mb: 1 }} />
      <Skeleton animation="wave" height={60} />
    </Box>
  );
});
