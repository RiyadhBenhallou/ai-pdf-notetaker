import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(req: NextRequest) {
  const reqUrl = req.url;
  const url = new URL(reqUrl);
  const pdfUrl = url.searchParams.get("pdfUrl");

  if (!pdfUrl) {
    return NextResponse.json({ error: "No PDF URL provided" });
  }
  const response = await fetch(pdfUrl);
  const buffer = await response.blob();

  // Create a Blob from the buffer
  const pdfFile = new Blob([buffer], { type: "application/pdf" });

  const loader = new WebPDFLoader(pdfFile);
  const docs = await loader.load();
  let pdfContent = "";

  docs.forEach((doc) => {
    pdfContent += doc.pageContent;
  });
  //   Split text into smaller chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 10,
  });

  const output = await splitter.createDocuments([pdfContent]);
  const splitList: string[] = [];

  output.forEach((chunk) => {
    splitList.push(chunk.pageContent);
  });

  return NextResponse.json({ result: splitList });
}
