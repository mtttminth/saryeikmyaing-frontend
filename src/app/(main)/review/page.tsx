"use client";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TablePagination,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { rowsPerPageOptions } from "@/consts/common";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  fetchAdminReview,
  fetchAdminReviewCategories,
} from "@/store/thunks/adminReviewThunk";
import { AdminReview } from "@/types/admin-review";
import { updateParams } from "@/store/slices/adminReviewSlice";

const ReviewScreen = () => {
  const {
    adminReviewLoading,
    adminReview,
    adminReviewList,
    adminReviewCategories,
    reviewParam,
  } = useSelector((state: RootState) => state.adminReview);
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");
  const [reviewBooks, setRevieBooks] = useState<AdminReview[]>([]);
  const [category, setCategory] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAdminReviewCategories());
  }, []);

  useEffect(() => {
    dispatch(fetchAdminReview(reviewParam));
  }, [reviewParam]);

  useEffect(() => {
    handleSearch();
  }, [page, perPage]);

  useEffect(() => {
    setRevieBooks(adminReview);
  }, [adminReview]);

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

  const handleSearch = () => {
    dispatch(updateParams({ page, category, perPage, keyword }));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleTextChange = (event: any) => {
    setKeyword(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%", px: 8, py: 3 }}>
      <Box className="content-center items-center mb-8">
        <Typography className="text-slate-800 pb-4">ဖတ်ညွှန်းများ</Typography>
        <Divider
          sx={{ width: "3rem", borderWidth: "2.5px", borderColor: "#00AFEF" }}
        />
      </Box>
      <Grid container sx={{ marginBottom: "2rem" }}>
        <Grid lg={3} xs={12} sx={{ marginRight: "2rem", marginBottom: "2rem" }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              စာအုပ်ကဏ္ဍအမျိုးအစား
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {adminReviewCategories.length != 0 &&
                adminReviewCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid lg={3} xs={12} sx={{ marginRight: "2rem", marginBottom: "2rem" }}>
          <TextField
            id="standard-basic"
            label="နာမည်ဖြင့် ရှာရန်"
            variant="standard"
            fullWidth
            value={keyword}
            onChange={handleTextChange}
          />
        </Grid>
        <Grid lg={3} xs={12}>
          <Button
            onClick={handleSearch}
            variant="contained"
            sx={{
              backgroundColor: "#00AFEF",
              color: "#ffffff",
              marginTop: "1rem",
            }}
          >
            ရှာမည်
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
        {adminReviewLoading
          ? Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} lg={4} key={index}>
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
          : reviewBooks.length > 0
          ? reviewBooks.map((review) => (
              <Grid
                item
                lg={4}
                xs={12}
                sx={{ marginBottom: 3 }}
                key={review.id}
              >
                <Grid container justifyContent="space-between">
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "left",
                      color: "#00AFEF",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {review.category}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "right",
                      color: "#373435",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Review By -{" "}
                    <span style={{ color: "#00AFEF" }}>
                      {review.reviewed_by}
                    </span>
                  </Typography>
                </Grid>
                <Card
                  sx={{
                    width: "100%",
                    backgroundColor: "#dedede",
                    minHeight: "405px",
                  }}
                >
                  <CardMedia
                    sx={{ width: "9rem", height: "15rem", margin: "auto" }}
                    image={review.book.image_url}
                    title={review.book.name}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        mb: 2,
                      }}
                    >
                      {review.book.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                        minHeight: "80px",
                      }}
                    >
                      {review.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => router.push(`/review-detail/${review.id}`)}
                      variant="contained"
                      sx={{
                        backgroundColor: "#373435",
                        width: "100%",
                        color: "#ffffff",
                      }}
                    >
                      သုံးသပ်ချက် ဖတ်မည်
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : adminReview.map((review) => (
              <Grid
                item
                lg={4}
                xs={12}
                sx={{ marginBottom: 3 }}
                key={review.id}
              >
                <Grid container justifyContent="space-between">
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "left",
                      color: "#00AFEF",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {review.category}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "right",
                      color: "#373435",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Review By -{" "}
                    <span style={{ color: "#00AFEF" }}>
                      {review.reviewed_by}
                    </span>
                  </Typography>
                </Grid>
                <Card
                  sx={{
                    width: "100%",
                    backgroundColor: "#dedede",
                    minHeight: "405px",
                  }}
                >
                  <CardMedia
                    sx={{ width: "9rem", height: "15rem", margin: "auto" }}
                    image={review.book.image_url}
                    title={review.book.name}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        mb: 2,
                      }}
                    >
                      {review.book.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                        minHeight: "80px",
                      }}
                    >
                      {review.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => router.push(`/review-detail/${review.id}`)}
                      variant="contained"
                      sx={{
                        backgroundColor: "#373435",
                        width: "100%",
                        color: "#ffffff",
                      }}
                    >
                      သုံးသပ်ချက် ဖတ်မည်
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={(adminReviewList.data && adminReviewList.meta?.total) || 0}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ReviewScreen;
