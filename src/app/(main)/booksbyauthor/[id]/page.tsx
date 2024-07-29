"use client";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  IconButton,
  TablePagination,
} from "@mui/material";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { rowsPerPageOptions } from "@/consts/common";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAuthorDetail } from "@/store/thunks/authorThunk";
import { fetchBooksByAuthor } from "@/store/thunks/bookThunk";
import { BooksByAuthor } from "@/types/books";
import { updateParams } from "@/store/slices/bookSlice";

type PageParams = {
  id: string;
};
const BookByAuthorScreen = ({ params }: { params: PageParams }) => {
  const { loading, bookListByAuthor, booksByAuthor, bookParam } = useSelector(
    (state: RootState) => state.book
  );
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const dispatch = useDispatch<AppDispatch>();
  const { authorLoading, authorDetail } = useSelector(
    (state: RootState) => state.author
  );

  const id = parseInt(params.id);

  useEffect(() => {
    dispatch(fetchAuthorDetail(id));
  }, []);
  useEffect(() => {
    dispatch(
      fetchBooksByAuthor({
        id,
        params: bookParam,
      })
    );
  }, [bookParam]);

  useEffect(() => {
    updatePage();
  }, [page, perPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const updatePage = () => {
    dispatch(updateParams({ page, perPage }));
  };
  return (
    <Box sx={{ width: "100%", px: 8, py: 3 }}>
      {authorLoading ? (
        <>
          <Skeleton variant="text" height={28} width="20%" sx={{ mb: 1 }} />
          <Divider
            sx={{
              width: "3rem",
              borderWidth: "2.5px",
              borderColor: "#cfcfcf",
              mb: 1,
            }}
          />
          <Skeleton variant="text" height={18} width="70%" />
          <Skeleton variant="text" height={18} width="60%" sx={{ mt: 0.5 }} />
          <Skeleton variant="text" height={18} width="80%" sx={{ mt: 0.5 }} />
        </>
      ) : (
        <Box className="content-center items-center mb-8">
          <p className="text-slate-800 pb-4 text-lg">{authorDetail.name}</p>
          <Divider
            sx={{ width: "3rem", borderWidth: "2.5px", borderColor: "#00AFEF" }}
          />
          <p className="text-slate-600 text-sm leading-10 mt-4">
            {authorDetail.biography}
          </p>
        </Box>
      )}
      <Grid container>
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    m: 5,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <Skeleton variant="rectangular" width={210} height={140} />
                  <Skeleton variant="text" width="80%" sx={{ my: 1 }} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </Grid>
            ))
          : booksByAuthor.map((book) => (
              <Grid xs={12} sm={6} md={3} sx={{ mb: 3, p: 1 }} key={book.id}>
                <Link href={`#`}>
                  <div className="grid place-items-center pb-2 relative">
                    <img
                      src={book.image_url}
                      alt={book.name}
                      className="h-auto md:w-40 sm:max-w-full"
                    />
                    {book.is_preorder === 1 && (
                      <img
                        src="/images/preOrder.png"
                        alt="Pre Order Now"
                        className="absolute top-0 left-12"
                        style={{ width: "60px", height: "60px" }}
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="truncate text-slate-900 text-sm leading-7">
                      {book.name}
                    </p>
                    <IconButton aria-label="fingerprint" color="secondary">
                      <FavoriteBorderIcon />
                    </IconButton>
                  </div>
                  {book.discounted_price != null ? (
                    <p className="text-sm text-cyan-500 leading-10">
                      <span className="text-xs text-red-500 pr-2 line-through">
                        {book.price} MMK
                      </span>
                      {book.discounted_price} MMK
                    </p>
                  ) : (
                    <p className="text-sm text-cyan-500 leading-10">
                      {book.price} MMK
                    </p>
                  )}
                  <div>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<AddShoppingCartIcon />}
                      sx={{
                        backgroundColor: "#373435",
                        color: "#FFFFFF",
                        width: "100%",
                      }}
                    >
                      ဈေးခြင်းထဲထည့်မယ်
                    </Button>
                  </div>
                </Link>
              </Grid>
            ))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={(bookListByAuthor.data && bookListByAuthor.meta?.total) || 0}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default BookByAuthorScreen;
