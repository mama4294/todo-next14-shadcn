import { adminDb } from "../../../../../firebase-admin";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { groupId } = await req.json();

  const ref = adminDb.collection("groups").doc(groupId);

  const bulkWriter = adminDb.bulkWriter();
  const MAX_RETRY_ATTEMPTS = 5;

  bulkWriter.onWriteError((error) => {
    if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
      return true;
    } else {
      console.log("Failed to delete document: ", error.documentRef.path);
      return false;
    }
  });

  try {
    console.log("Attempting to delete");
    await adminDb.recursiveDelete(ref, bulkWriter);
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Deleting promise rejected, ", error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
