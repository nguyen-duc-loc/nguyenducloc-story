import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gửi thư cho nguyenducloc",
  description: "Hãy gửi những bức thư ý nghĩa cho tớ nhé.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <section className="max-w-3xl mx-auto">{children}</section>;
};

export default Layout;
