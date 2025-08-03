// components/rental-request/RentalRequestTable.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef } from "react";

export interface RentalRequestType {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  ownerID: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    area: string;
    cnic: string;
    shopName: string;
    profilePicture?: string;
    cnicPicture?: string;
  };

  renterID: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    area: string;
    cnic: string;
    profilePicture?: string;
    cnicPicture?: string;
  };

  productID: {
    _id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    location: string;
    timePeriod: string;
    image?: string;
  };
}

interface RentalRequestTableProps {
  rentalRequests: RentalRequestType[];
}

export default function RentalRequestTable({ rentalRequests }: RentalRequestTableProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState<RentalRequestType | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleRowClick = (req: RentalRequestType) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: contentRef.current.scrollHeight, behavior: "smooth" });
    }
  };

  const DEFAULT_AVATAR = "/default-avatar.png";
  const renderImage = (src: string | undefined, alt: string) =>
    src ? (
      <div className="flex flex-col items-center gap-2">
        <img src={`${BASE_URL}/uploads/${src}`} alt={alt} className="w-20 h-20 object-cover border rounded-full shadow" />
        <a href={`${BASE_URL}/uploads/${src}`} download className="text-xs text-blue-600 underline">Download</a>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-2">
        <img src={DEFAULT_AVATAR} alt="Default" className="w-20 h-20 object-cover border rounded-full shadow" />
        <span className="text-xs text-gray-400">N/A</span>
      </div>
    );

  return (
    <div className="overflow-x-auto max-w-full rounded-xl shadow-lg bg-white border">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 sticky top-0 z-10">
            {/* <th className="border px-2 py-1">Request ID</th> */}
            <th className="border px-2 py-1">Status</th>
            {/* <th className="border px-2 py-1">Created At</th>
            <th className="border px-2 py-1">Updated At</th> */}
            {/* Owner Info */}
            <th className="border px-2 py-1">Owner Name</th>
            <th className="border px-2 py-1">Owner Email</th>
            <th className="border px-2 py-1">Owner Phone</th>
            <th className="border px-2 py-1">Owner Area</th>
            <th className="border px-2 py-1">Owner CNIC</th>
            <th className="border px-2 py-1">Owner Shop Name</th>
            <th className="border px-2 py-1">Owner Profile</th>
            <th className="border px-2 py-1">Owner CNIC Pic</th>
            {/* Renter Info */}
            <th className="border px-2 py-1">Renter Name</th>
            <th className="border px-2 py-1">Renter Email</th>
            <th className="border px-2 py-1">Renter Phone</th>
            <th className="border px-2 py-1">Renter Area</th>
            <th className="border px-2 py-1">Renter CNIC</th>
            <th className="border px-2 py-1">Renter Profile</th>
            <th className="border px-2 py-1">Renter CNIC Pic</th>
            {/* Product Info */}
            <th className="border px-2 py-1">Product Name</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Location</th>
            <th className="border px-2 py-1">Time Period</th>
            <th className="border px-2 py-1">Product Image</th>
          </tr>
        </thead>
        <tbody>
          {rentalRequests.map((req) => (
            <tr key={req._id} className="text-sm even:bg-gray-50 cursor-pointer hover:bg-primary/10 transition" onClick={() => handleRowClick(req)}>
              {/* <td className="border px-2 py-1">{req._id}</td> */}
              <td className="border px-2 py-1">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : req.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{req.status}</span>
              </td>
              {/* <td className="border px-2 py-1">{new Date(req.createdAt).toLocaleString()}</td>
              <td className="border px-2 py-1">{new Date(req.updatedAt).toLocaleString()}</td> */}
              {/* Owner Info */}
              <td className="border px-2 py-1">{req.ownerID?.fullName}</td>
              <td className="border px-2 py-1">{req.ownerID?.email}</td>
              <td className="border px-2 py-1">{req.ownerID?.phoneNumber}</td>
              <td className="border px-2 py-1">{req.ownerID?.area}</td>
              <td className="border px-2 py-1">{req.ownerID?.cnic}</td>
              <td className="border px-2 py-1">{req.ownerID?.shopName}</td>
              <td className="border px-2 py-1">{req.ownerID?.profilePicture ? <img src={`${BASE_URL}/uploads/${req.ownerID.profilePicture}`} alt="Owner Profile" className="w-10 h-10 rounded-full object-cover border" /> : "N/A"}</td>
              <td className="border px-2 py-1">{req.ownerID?.cnicPicture ? <img src={`${BASE_URL}/uploads/${req.ownerID.cnicPicture}`} alt="Owner CNIC" className="w-10 h-10 rounded object-cover border" /> : "N/A"}</td>
              {/* Renter Info */}
              <td className="border px-2 py-1">{req.renterID?.fullName}</td>
              <td className="border px-2 py-1">{req.renterID?.email}</td>
              <td className="border px-2 py-1">{req.renterID?.phoneNumber}</td>
              <td className="border px-2 py-1">{req.renterID?.area}</td>
              <td className="border px-2 py-1">{req.renterID?.cnic}</td>
              <td className="border px-2 py-1">{req.renterID?.profilePicture ? <img src={`${BASE_URL}/uploads/${req.renterID.profilePicture}`} alt="Renter Profile" className="w-10 h-10 rounded-full object-cover border" /> : "N/A"}</td>
              <td className="border px-2 py-1">{req.renterID?.cnicPicture ? <img src={`${BASE_URL}/uploads/${req.renterID.cnicPicture}`} alt="Renter CNIC" className="w-10 h-10 rounded object-cover border" /> : "N/A"}</td>
              {/* Product Info */}
              <td className="border px-2 py-1">{req.productID?.name}</td>
              <td className="border px-2 py-1">{req.productID?.category}</td>
              <td className="border px-2 py-1">{req.productID?.price}</td>
              <td className="border px-2 py-1">{req.productID?.description}</td>
              <td className="border px-2 py-1">{req.productID?.location}</td>
              <td className="border px-2 py-1">{req.productID?.timePeriod}</td>
              <td className="border px-2 py-1">{req.productID?.image ? <img src={`${BASE_URL}/uploads/${req.productID.image}`} alt="Product" className="w-10 h-10 rounded object-cover border" /> : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for full details */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl rounded-2xl shadow-2xl bg-white p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary text-gray-800">Rental Request Details</DialogTitle>
            <DialogClose
              onClick={closeModal}
              className="absolute right-3.5 top-3.5 rounded-full bg-gray-200 hover:bg-gray-300 p-2 h-5 w-5"
            >
              {/* <X className="h-5 w-5" /> */}
            </DialogClose>
          </DialogHeader>
          {selectedRequest ? (
            <div ref={contentRef} className="divide-y divide-gray-200 mt-4 max-h-[70vh] overflow-y-auto relative">
              {/* Scroll Down Button */}
              <button
                onClick={scrollToBottom}
                className="fixed right-10 bottom-32 z-50 bg-primary text-white rounded-full p-2 shadow hover:bg-primary/80 transition"
                title="Scroll Down"
                type="button"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="fixed right-10 bottom-20 z-50 bg-primary text-white rounded-full p-2 shadow hover:bg-primary/80 transition"
                title="Back to Top"
                type="button"
              >
                <ChevronUp className="w-6 h-6" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                {/* Request Info */}
                <div>
                  <h2 className="font-bold mb-2">Request Info</h2>
                  {/* <div><b>ID:</b> {selectedRequest._id}</div>
                  <div><b>Status:</b> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : selectedRequest.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{selectedRequest.status}</span></div>
                  <div><b>Created At:</b> {selectedRequest.createdAt ? new Date(selectedRequest.createdAt).toLocaleString() : "N/A"}</div>
                  <div><b>Updated At:</b> {selectedRequest.updatedAt ? new Date(selectedRequest.updatedAt).toLocaleString() : "N/A"}</div> */}
                </div>
                {/* Product Info */}
                <div>
                  <h2 className="font-bold mb-2">Product Info</h2>
                  <div><b>Name:</b> {selectedRequest.productID?.name || "N/A"}</div>
                  <div><b>Category:</b> {selectedRequest.productID?.category || "N/A"}</div>
                  <div><b>Price:</b> {selectedRequest.productID?.price ?? "N/A"}</div>
                  <div><b>Description:</b> {selectedRequest.productID?.description || "N/A"}</div>
                  <div><b>Location:</b> {selectedRequest.productID?.location || "N/A"}</div>
                  <div><b>Time Period:</b> {selectedRequest.productID?.timePeriod || "N/A"}</div>
                  <div><b>Product Image:</b> {renderImage(selectedRequest.productID?.image, "Product")}</div>
                </div>
              </div>
              {/* Owner and Renter Info */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="font-bold mb-2">Owner Info</h2>
                  <div><b>Name:</b> {selectedRequest.ownerID?.fullName || "N/A"}</div>
                  <div><b>Email:</b> {selectedRequest.ownerID?.email || "N/A"}</div>
                  <div><b>Phone:</b> {selectedRequest.ownerID?.phoneNumber || "N/A"}</div>
                  <div><b>Area:</b> {selectedRequest.ownerID?.area || "N/A"}</div>
                  <div><b>CNIC:</b> {selectedRequest.ownerID?.cnic || "N/A"}</div>
                  <div><b>Shop Name:</b> {selectedRequest.ownerID?.shopName || "N/A"}</div>
                  <div><b>Profile Picture:</b> {renderImage(selectedRequest.ownerID?.profilePicture, "Owner Profile")}</div>
                  <div><b>CNIC Picture:</b> {renderImage(selectedRequest.ownerID?.cnicPicture, "Owner CNIC")}</div>
                </div>
                <div>
                  <h2 className="font-bold mb-2">Renter Info</h2>
                  <div><b>Name:</b> {selectedRequest.renterID?.fullName || "N/A"}</div>
                  <div><b>Email:</b> {selectedRequest.renterID?.email || "N/A"}</div>
                  <div><b>Phone:</b> {selectedRequest.renterID?.phoneNumber || "N/A"}</div>
                  <div><b>Area:</b> {selectedRequest.renterID?.area || "N/A"}</div>
                  <div><b>CNIC:</b> {selectedRequest.renterID?.cnic || "N/A"}</div>
                  <div><b>Profile Picture:</b> {renderImage(selectedRequest.renterID?.profilePicture, "Renter Profile")}</div>
                  <div><b>CNIC Picture:</b> {renderImage(selectedRequest.renterID?.cnicPicture, "Renter CNIC")}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No rental request details available</div>
          )}
          <div className="flex justify-end mt-6 pt-4 border-t">
            <Button onClick={closeModal} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
