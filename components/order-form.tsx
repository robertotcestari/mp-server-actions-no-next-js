'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';
import { DatePicker } from './ui/date-picker';
import { Input } from './ui/input';
import { Label } from './ui/label';
import createOrder from '@/lib/actions/create-order';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useFormState, useFormStatus } from 'react-dom';
import { LoaderIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrderForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [orderDate, setOrderDate] = useState<Date>();
  const [state, formAction] = useFormState(createOrder, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.message);
    }
    if (!state?.error && state?.message) {
      toast.success(state.message);
      setOpen(false);
    }
  }, [state, state?.error, state?.message]);

  return (
    <form action={formAction} className="grid items-start gap-4">
      <div className="grid gap-2">
        <Label htmlFor="customer_name">Nome do Cliente</Label>
        <Input
          name="customer_name"
          id="customer_name"
          placeholder="José Carlos da Silva"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="customer_email">Email do Cliente</Label>
        <Input
          name="customer_email"
          type="email"
          id="customer_email"
          placeholder="jose@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" required>
          <SelectTrigger className="">
            <SelectValue placeholder="Pendente | Completo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="completed">Completo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Data do Pedido</Label>
        <DatePicker
          onSelect={(value) => {
            setOrderDate(value);
          }}
        />
        <input
          type="hidden"
          name="order_date"
          value={orderDate && format(orderDate, 'yyyy-MM-dd')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount_in_cents">Valor do Pedido</Label>
        <Input
          name="amount_in_cents"
          id="amount_in_cents"
          placeholder="100,00"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? (
        <div className="animate-spin">
          <LoaderIcon className="w-4 h-4 animate-spin" />
        </div>
      ) : (
        'Cadastrar'
      )}
    </Button>
  );
}
