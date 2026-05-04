import { prisma } from "@/lib/prisma";
import AddProductForm from "./AddProductForm";

export const revalidate = 0;

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  const contacts = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const complaints = await prisma.complaint.findMany({
    orderBy: { createdAt: "desc" },
  });

  const products = await prisma.product.findMany({
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
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border border-gray-700 p-4"
            >
              <p>
                <strong>{product.name}</strong>
              </p>
              <p>{product.description}</p>
              <p>£{product.price}</p>
              <p className="text-sm text-gray-400">{product.image}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Orders</h2>

        <div className="space-y-3">
          {orders.map((order) => (
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
                <strong>Total:</strong> £{order.total}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Reviews</h2>

        <div className="space-y-3">
          {reviews.map((review) => (
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
          {contacts.map((msg) => (
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
          {complaints.map((complaint) => (
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