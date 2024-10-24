'use client'
import { IoMdMail } from "react-icons/io";
import { FaPencilAlt, FaRegTrashAlt, FaPhoneAlt } from "react-icons/fa";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getUsers, getConsultas } from "./utils";
import * as React from "react"
import { Modal } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Usuario, { IUsuario } from '@/models/usuario';
import Consulta, { IConsulta} from '@/models/consulta';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function page() {

  const [usuarios, setUsers] = useState<IUsuario[]>([])

  const [busqueda, setBusqueda] = useState('');

  const [consultas, setConsulta] = useState<IConsulta[]>([]);

  const [selectedConsultaId, setSelectedConsultaId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setSelectedConsultaId(id);
  };
  
  const closeModal = () => {
    setSelectedConsultaId(null);
  };

  useEffect(() => {
    getUsers().then(users => setUsers(users))  
  }, [])

  useEffect(() => {
    getConsultas().then(consultas => setConsulta(consultas))
  }, [])

  const cambiobuscador = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setBusqueda(event.target.value); // esta funcion irá actualizando constantemente al tipear sobre el input
  };



  const usuariofiltrado: IUsuario[] = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    usuario.apellidoPaterno.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <header className="bg-slate-500 flex justify-end lg:py-8 py-4 px-8">
        <div className="flex items-start gap-4">
          <img className="size-16" src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" />
          <div className="flex flex-col">
          <span>
            Juan
          </span>
          <Button>
            Cerrar sesion
          </Button>
          </div>
        </div>
      </header>
      <main className="min-h-screen bg-slate-300 flex gap-12">
      <aside className="flex-[2] bg-white lg:ml-8 p-8">
        <h2 className="text-2xl font-semibold text-slate-900 py-2 text-center">Listado de Abogados</h2>
        <Input type="text" className="my-4" placeholder="Buscar..." value={busqueda} onChange={cambiobuscador} />
        <Accordion className="h-65 overflow-auto" type="single" collapsible>
        {usuariofiltrado.filter(usuario => usuario.rol === "abogado").map(usuario => (
          <AccordionItem key={usuario._id} value={usuario._id}>
            <AccordionTrigger>{usuario.nombre} {usuario.apellidoPaterno}</AccordionTrigger>
            <AccordionContent>
              {usuario.rol}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
        </aside>
        <div className="flex-[8] bg-white p-8">
        <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Nombre Cliente</TableHead>
          <TableHead>Apellido Cliente</TableHead>
          <TableHead>Dirección Cliente</TableHead>
          <TableHead className="text-right">Email Cliente</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Abogado a cargo</TableHead>
          <TableHead>Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
        {consultas.map((consulta) => (
          <TableRow key={consulta._id}>
          <TableCell><Checkbox/></TableCell>
            <TableCell className="font-medium">{consulta.nombre_cliente}</TableCell>
            <TableCell>{consulta.apellidom_cliente}</TableCell>
            <TableCell>{consulta.direccion_cliente}</TableCell>
            <TableCell className="text-right">{consulta.email_cliente}</TableCell>
            <TableCell>
              <div className="flex gap-4">
              <div className={consulta.derivado ? 'flex size-4 bg-green-500' : 'size-4 bg-red-500'}></div>
              <div>{consulta.estadoConsulta}</div>
              </div>
            </TableCell>
            <TableCell>
            <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Abogado a cargo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Abogados</SelectLabel>
          {usuarios.filter(usuario => usuario.rol === 'abogado').map(usuario => (
          <SelectItem value={usuario._id}>{usuario.nombre + ' ' + usuario.apellidoPaterno}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
            </TableCell>
            <TableCell className="flex gap-4 items-center">
              <Button onClick={() => openModal(consulta._id)} size='icon' variant="outline">+</Button>
                <Modal isOpen={selectedConsultaId === consulta._id} onClose={closeModal}>
                  <h2 className="text-xl font-bold">Caso cliente {consulta.nombre_cliente}</h2>
                  <p>Nombre completo cliente: {consulta.nombre_cliente} {consulta.apellidop_cliente} {consulta.apellidom_cliente}</p>
                  <p>fecha consulta: {consulta.fechaConsulta}</p>
                  <p>Contacto cliente:<FaPhoneAlt/> {consulta.contacto_cliente} <IoMdMail /> {consulta.email_cliente}</p>
                  <p>Pregunta asociada al caso: {consulta.pregunta}</p>
                  <p>Respuesta asociada al caso: {consulta.respuestaBot}</p>
                  <p>Abogado a cargo: {consulta.nombre_abogado} {consulta.apellidop_abogado}</p>
                </Modal>
              <Button size='icon' variant='default'><FaPencilAlt /></Button>
              <Button size='icon' variant='destructive'><FaRegTrashAlt /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        </div>
      </main>
    </>
  )
}