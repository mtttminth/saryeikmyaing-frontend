"use client";
import {
  Box,
  Tab,
  Typography,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Icon } from "@iconify/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@mui/material";
import React, { useEffect, useCallback, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCollections } from "@/store/thunks/collectionThunk";
import { fetchPreorders } from "@/store/thunks/preorderThunk";
import { fetchAdminReview } from "@/store/thunks/adminReviewThunk";

const searchParamsWrapper = () => {
  const searchParams = useSearchParams();
  return searchParams;
}
const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { collectionLoading, collections } = useSelector(
    (state: RootState) => state.collection
  );
  const { preorderLoading, preorders } = useSelector(
    (state: RootState) => state.preorder
  );
  const { adminReviewLoading, adminReview, reviewParam } = useSelector(
    (state: RootState) => state.adminReview
  );

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchPreorders());
    dispatch(fetchAdminReview(reviewParam));
  }, [dispatch]);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParamsWrapper.toString());
      params.set(name, value);

      return params.toString();
    },
    []
  );
  const AdminReviews = adminReview?.slice(0, 3) || [];
  const collectionSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
  };
  const preorderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(5, preorders.length),
    slidesToScroll: 1,
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box sx={{ width: "100%", px: 8, py: 3 }}>
        <div>
          {collectionLoading ? (
            <div className="flex space-x-2">
              <Skeleton variant="rectangular" width={"100%"} height={300} />
            </div>
          ) : (
            <div>
              {collections &&
                collections.map((collect, index) => (
                  <div key={index} className="mt-10">
                    <Box className="flex content-center items-center">
                      <Icon icon="fluent-emoji-flat:blue-book" width={30} />
                      <Typography className="text-slate-800">
                        {collect.name}
                      </Typography>
                    </Box>
                    <div className="mt-10">
                      <div className="xl:mx-44 sm:mx-0">
                        {collect.books.length > 1 ? (
                          <Slider
                            {...collectionSettings}
                            slidesToShow={Math.min(5, collect.books.length)}
                          >
                            {collect.books &&
                              collect.books.map((book) => (
                                <Link href="#" className="px-2" key={book.id}>
                                  <img
                                    src={book.image_url}
                                    className="h-auto max-w-full"
                                  />
                                </Link>
                              ))}
                          </Slider>
                        ) : (
                          collect.books.map((book) => (
                            <Link href="#" className="px-2" key={book.id}>
                              <img
                                src={book.image_url}
                                className="h-auto max-w-full"
                              />
                            </Link>
                          ))
                        )}
                      </div>
                      <div>
                        <img
                          src="/images/bookshelf.png"
                          className="h-auto max-w-full"
                        />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                        <Button
                          onClick={() =>
                            router.push(
                              `/booksbycollection/${collect.id}` +
                                "?" +
                                createQueryString("name", collect.name)
                            )
                          }
                          variant="contained"
                          sx={{ backgroundColor: "#CACACA", color: "#000000" }}
                        >
                          အကုန်ကြည့်မည်
                        </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="mt-8">
          <Box className="flex content-center items-center">
            <img src="/images/preOrder.png" width={60} />
            <Typography className="text-slate-800">
              Pre Order ကြိုတင်မှာယူနိုင်သည့်စာအုပ်များ
            </Typography>
          </Box>
          <div>
            {preorderLoading ? (
              <div className="flex space-x-2">
                <Skeleton variant="rectangular" width={"100%"} height={300} />
              </div>
            ) : (
              <div className="mt-10">
                <div className="xl:mx-44 sm:mx-0">
                  {preorders.length > 1 ? (
                    <Slider {...preorderSettings}>
                      {preorders &&
                        preorders.map((preorder) => (
                          <Link href="#" className="px-2" key={preorder.id}>
                            <img
                              src={preorder.image_url}
                              alt={preorder.name}
                              className="h-auto max-w-full"
                            />
                          </Link>
                        ))}
                    </Slider>
                  ) : (
                    preorders &&
                    preorders.map((preorder) => (
                      <Link href="#" className="px-2" key={preorder.id}>
                        <img
                          src={preorder.image_url}
                          alt={preorder.name}
                          className="h-auto max-w-full"
                        />
                      </Link>
                    ))
                  )}
                </div>
                <div>
                  <img
                    src="/images/bookshelf.png"
                    className="h-auto max-w-full"
                  />
                </div>
                <div className="text-center mt-4">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#CACACA", color: "#000000" }}
                  >
                    အကုန်ကြည့်မည်
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          <Typography className="text-slate-800">ဖတ်ညွှန်းများ</Typography>
          <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
            {adminReviewLoading
              ? Array.from(new Array(3)).map((_, index) => (
                  <Grid item lg={4} xs={12} key={index}>
                    <Card sx={{ width: "100%", backgroundColor: "#dadada" }}>
                      <Skeleton
                        variant="rectangular"
                        width="9rem"
                        height="15rem"
                        sx={{ margin: "auto" }}
                      />
                      <Skeleton
                        variant="text"
                        height={20}
                        width="80%"
                        sx={{ margin: "auto", mt: 2 }}
                      />
                      <Skeleton
                        variant="text"
                        height={20}
                        width="60%"
                        sx={{ margin: "auto", mt: 1 }}
                      />
                      <Skeleton variant="rectangular" height={48} sx={{ m: 3 }} />
                    </Card>
                  </Grid>
                ))
              : AdminReviews.map((review) => (
                  <Grid item lg={4} xs={12} key={review.id}>
                    <Card
                      sx={{
                        width: "100%",
                        backgroundColor: "#dadada",
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
        </div>
      </Box>
    </Suspense>
  );
};

export default HomeScreen;
