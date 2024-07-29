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
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchAdminReviewDetail,
  fetchRelatedAdminReview,
} from "@/store/thunks/adminReviewThunk";
import { useRouter } from "next/navigation";
type PageParams = {
  id: string;
};
const ReviewDetailScreen = ({ params }: { params: PageParams }) => {
  const id = parseInt(params.id);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { adminReviewLoading, adminReviewDetail, relatedAdminReview } =
    useSelector((state: RootState) => state.adminReview);
  useEffect(() => {
    dispatch(fetchAdminReviewDetail(id));
    dispatch(fetchRelatedAdminReview(id));
  }, []);
  return (
    <Box sx={{ width: "100%", px: 8, py: 3 }}>
      <Grid container justifyContent="space-between">
        <Grid>
          <Box className="content-center items-center mb-4">
            {adminReviewLoading ? (
              <Skeleton width="200px" height="50px" />
            ) : (
              <Typography className="text-slate-800 pb-4">
                {adminReviewDetail.book?.name}
              </Typography>
            )}
            <Divider
              sx={{
                width: "3rem",
                borderWidth: "2.5px",
                borderColor: "#00AFEF",
              }}
            />
          </Box>
        </Grid>
        <Grid>
          <Button
            onClick={() =>
              router.push(`/book-detail/${adminReviewDetail.book.id}`)
            }
            variant="contained"
            sx={{
              backgroundColor: "#373435",
              width: "100%",
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            စာအုပ်မှာမည်
          </Button>
        </Grid>
      </Grid>
      {adminReviewLoading ? (
        <>
          <Skeleton
            width="15%"
            height="20px"
            style={{ marginBottom: "1rem" }}
          />
          <Skeleton variant="rectangular" width="20%" height="300px" />
          <Skeleton width="100%" height="100px" />
        </>
      ) : (
        <>
          <Typography
            variant="body2"
            sx={{ color: "#373435", marginBottom: "1rem" }}
          >
            Review By -{" "}
            <span style={{ color: "#00AFEF" }}>
              {adminReviewDetail.reviewed_by}
            </span>
          </Typography>
          <img
            src={adminReviewDetail.book?.image_url}
            alt={adminReviewDetail.book?.name}
            className="h-auto md:w-48 sm:max-w-full"
          />
          <Typography
            variant="body2"
            sx={{
              color: "#373435",
              marginBottom: "1rem",
              lineHeight: "2.5rem",
            }}
          >
            {adminReviewDetail.content}
          </Typography>
        </>
      )}
      <Grid item lg={4} xs={12}>
        {adminReviewLoading ? (
          <Grid>
            <Skeleton variant="text" height={28} width="15%" sx={{ m: 1 }} />
            <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
              {[...new Array(3)].map((_, index) => (
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
              ))}
            </Grid>
          </Grid>
        ) : relatedAdminReview.length > 0 ? (
          <Grid>
            <Typography className="text-slate-800 py-8">
              {adminReviewLoading ? (
                <Skeleton
                  variant="text"
                  height={28}
                  width="15%"
                  sx={{ m: 1 }}
                />
              ) : (
                "စာပေကဏ္ဍတူဖတ်ညွှန်းများ"
              )}
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
              {relatedAdminReview.map((review) => (
                <Grid item lg={4} xs={12} key={review.id}>
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
                  <Card sx={{ width: "100%", backgroundColor: "#dedede" }}>
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
                        {review.content}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() =>
                          router.push(`/review-detail/${review.id}`)
                        }
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
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default ReviewDetailScreen;
