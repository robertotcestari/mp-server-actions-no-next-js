'use server';

import { revalidatePath } from 'next/cache';

export default async function deleteOrder(prevState: any, formData: FormData) {
  const orderId = formData.get('orderId') as string;

  const res = await fetch(
    `https://apis.codante.io/api/orders-api/orders/${orderId}`,
    {
      method: 'DELETE',
    }
  );

  // revalidatePath('/');

  if (!res.ok) {
    return {
      error: true,
      message: 'Ocorreu um erro ao deletar o pedido',
    };
  } else {
    return {
      error: false,
      message: 'Pedido deletado com sucesso!',
    };
  }
}
