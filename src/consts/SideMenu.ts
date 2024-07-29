import { UserMenu } from "@/types/menu";
export const DRAWER_WIDTH = 270;
export const USER_MENU_ITEM: UserMenu[] = [
  {
    type: "item",
    label: "ပင်မစာအိမ်",
    href: "home",
    permission: "",
  },
  {
    type: "item-tree",
    label: "စာရေးဆရာများ",
    subitems: [
      {
        label: "ကိုကိုလေး",
        href: "booksbyauthor",
        permission: "",
      },
      {
        label: "ကိုနေ (မန်း)",
        href: "booksbyauthor",
        permission: "",
      },
      {
        label: "ကျော့မောင် (မင်္ဂလာတောင်ညွှန့်)",
        href: "booksbyauthor",
        permission: "",
      },
      {
        label: "ကျော်အောင်",
        href: "booksbyauthor",
        permission: "",
      },
    ],
  },
  {
    type: "item",
    label: "ဖတ်ညွှန်းများ",
    href: "review",
    permission: "",
  },
  {
    type: "item",
    label: "စာအုပ်သတင်းများ",
    href: "",
    permission: "",
  },
  {
    type: "item",
    label: "စာရေးသူကဏ္ဍ",
    href: "",
    permission: "",
  },
  {
    type: "item",
    label: "E-books",
    href: "ebooks",
    permission: "",
  },
];
