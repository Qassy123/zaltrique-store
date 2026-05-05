import { prisma } from "@/lib/prisma";
import AddProductForm from "./AddProductForm";
import DeleteProductButton from "./DeleteProductButton";
import EditProductForm from "./EditProductForm";
import UpdateOrderTrackingForm from "./UpdateOrderTrackingForm";
import type {
  Product,
  Review,
  ContactMessage,
  Complaint,
  Prisma,
} from "@prisma/client";

export const revalidate = 0;

type OrderWithItemsAndUser = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
    user: true;
  };
}>;

export default async function AdminPage() {
  const orders: OrderWithItemsAndUser[] = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      orderItems: true,
      user: true,
    },
  });

  const reviews: Review[] = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  const contacts: ContactMessage[] = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const complaints: Complaint[] = await prisma.complaint.findMany({
    orderBy: { createdAt: "desc" },
  });

  const products: Product[] = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <h1 className="mb-10 text-3xl font-bold">Admin Dashboard</h1>

      <section className="mb-12 rounded-xl border border-gray-700 p-6">
        <h2 className="mb-4 text-xl font-semibold">Add Product</h2>
        <AddProductForm />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Products</h2>

        <div className="space-y-3">
          {products.map((product: Product) => {
            const productImages =
              product.images && product.images.length > 0
                ? product.images
                : [product.image];

            return (
              <div
                key={product.id}
                className="rounded-lg border border-gray-700 p-4"
              >
                <p>
                  <strong>{product.name}</strong>
                </p>

                <p>{product.description}</p>
                <p>£{product.price}</p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {productImages.map((img, index) => (
                    <img
                      key={`${img}-${index}`}
                      src={img}
                      alt={`${product.name} image ${index + 1}`}
                      className="h-24 w-24 rounded border border-gray-800 object-cover"
                    />
                  ))}
                </div>

                <p className="mt-3 text-sm text-gray-400">
                  {productImages.length} image
                  {productImages.length === 1 ? "" : "s"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <EditProductForm
                    product={{
                      id: product.id,
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      image: product.image,
                      images: productImages,
                    }}
                  />

                  <DeleteProductButton id={product.id} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Orders</h2>

        <div className="space-y-4">
          {orders.map((order: OrderWithItemsAndUser) => (
            <div
              key={order.id}
              className="rounded-lg border border-gray-700 p-4"
            >
              <p>
                <strong>ID:</strong> {order.id}
              </p>

              <p>
                <strong>Email:</strong> {order.email || "N/A"}
              </p>

              <p>
                <strong>Account:</strong>{" "}
                {order.user
                  ? `${order.user.firstName} ${order.user.lastName}`
                  : "Guest checkout"}
              </p>

              <p>
                <strong>Total:</strong> £{order.total.toFixed(2)}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{order.status}</span>
              </p>

              {order.trackingCode && (
                <p>
                  <strong>Tracking:</strong>{" "}
                  <a
                    href={`https://www.royalmail.com/track-your-item#/tracking-results/${order.trackingCode}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {order.trackingCode}
                  </a>
                </p>
              )}

              <div className="mt-4 rounded-lg border border-gray-800 p-3">
                <p className="mb-2 font-semibold">Shipping Address</p>

                <p>{order.fullName || "N/A"}</p>
                <p>{order.addressLine1 || "N/A"}</p>

                {order.addressLine2 && <p>{order.addressLine2}</p>}

                <p>{order.city || "N/A"}</p>
                <p>{order.postcode || "N/A"}</p>
                <p>{order.country || "United Kingdom"}</p>
              </div>

              <div className="mt-4 rounded-lg border border-gray-800 p-3">
                <p className="mb-2 font-semibold">Items</p>

                {order.orderItems.length === 0 ? (
                  <p className="text-sm text-gray-400">No items found</p>
                ) : (
                  <div className="space-y-2">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="text-sm text-gray-300">
                        {item.name} × {item.quantity} — £
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <UpdateOrderTrackingForm
                orderId={order.id}
                currentStatus={order.status}
                currentTrackingCode={order.trackingCode}
              />

              <p className="mt-3 text-sm text-gray-400">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Reviews</h2>

        <div className="space-y-3">
          {reviews.map((review: Review) => (
            <div
              key={review.id}
              className="rounded-lg border border-gray-700 p-4"
            >
              <p>
                <strong>{review.name}</strong> ({review.email || "No email"})
              </p>
              <p>⭐ {review.rating}/5</p>
              <p>{review.message}</p>
              {review.verified && (
                <p className="text-sm text-green-400">✔ Verified Buyer</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Contact Messages</h2>

        <div className="space-y-3">
          {contacts.map((msg: ContactMessage) => (
            <div
              key={msg.id}
              className="rounded-lg border border-gray-700 p-4"
            >
              <p>
                <strong>{msg.name}</strong> ({msg.email})
              </p>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Complaints</h2>

        <div className="space-y-3">
          {complaints.map((complaint: Complaint) => (
            <div
              key={complaint.id}
              className="rounded-lg border border-gray-700 p-4"
            >
              <p>
                <strong>Order:</strong> {complaint.orderNumber}
              </p>
              <p>
                <strong>Email:</strong> {complaint.email}
              </p>
              <p>{complaint.issue}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}