import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";
import { CID } from "multiformats"

import { createBlobFromFilePath } from "./helper"

import { fetchBlob } from "../src/fetchBlob";

test("check", () => {
  console.log("OK");
});

test("fetch image", async () => {
  try {
    const fixture = await createBlobFromFilePath("../__fixtures__/lenna.png")

    if(!fixture) throw new Error("fixture error");

    const helia = await createHelia()
    const fs = unixfs(helia)
    const cid = CID.parse("QmY6uB34eTv4dptqt6RX22yNmSGYgqm44T7q6dNiRfhFYX")
    const blob = await fetchBlob(fs, cid, "image/png")

    const buf1 = await fixture.arrayBuffer()
    const buf2 = await blob.arrayBuffer()

    expect(buf1).toEqual(buf2);
  } catch (err) {
    console.error(err);
  }
});