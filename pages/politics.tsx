import {
  Text,
  Container,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";

const TitleSection = ({ title }) => {
  return (
    <Heading as="h2" color="primary.500" fontSize="xl" my={4}>
      {title}
    </Heading>
  );
};

const Politics: React.FC = () => {
  return (
    <Container maxW="container.lg" mt={4}>
      <Heading>
        Al crear una cuenta, usted está aceptando nuestra Politica de Privacidad
      </Heading>
      <TitleSection title="Información Personal" />
      <Text>
        Mientras use Nuestro Servicio, podemos pedirle que nos proporcione
        cierta información de identificación personal que se puede usar para
        contactarlo o identificarlo. La información de identificación personal
        puede incluir, entre otros:
      </Text>
      <UnorderedList fontWeight={500} p={4}>
        <ListItem>Dirección de correo electrónico</ListItem>
        <ListItem>Nombre y apellido</ListItem>
        <ListItem>Número de teléfono</ListItem>
        <ListItem>Contraseñas</ListItem>
      </UnorderedList>
      <TitleSection title="Tecnologías de seguimiento" />
      <Text>
        Usamos tecnologías de seguimiento para rastrear la actividad en Nuestro
        Servicio y almacenar cierta información. Las tecnologías de seguimiento
        utilizadas son balizas, etiquetas y scripts que sirven para recopilar y
        rastrear información y para mejorar y analizar Nuestro Servicio.
      </Text>
      <TitleSection title="Uso de datos personales" />
      <Text>
        Nuestro Sistema utiliza la información personal de los usuarios con los
        siguientes fines:
      </Text>
      <UnorderedList fontWeight={500} p={4}>
        <ListItem>
          Gestión de Cuenta Los datos personales que proporcione pueden darle
          acceso a diferentes funcionalidades del servicio que están disponibles
          para Usted como usuario registrado.
        </ListItem>
        <ListItem>
          Contacto Para contactarlo por correo electrónico, llamadas
          telefónicas, SMS u otras formas equivalentes de comunicación
          electrónica, tales como notificaciones automáticas de una aplicación
          móvil sobre actualizaciones o comunicaciones informativas.
        </ListItem>
        <ListItem>
          Notificaciones Recibirá noticias, ofertas especiales e información
          general sobre otros bienes, servicios y eventos que se ofrece dentro
          de la página optando si selecciono recibir notificaciones o no.
        </ListItem>
        <ListItem>
          Otros fines Se puede utilizar su información para otros fines, como el
          análisis de datos, la identificación de tendencias de uso.
        </ListItem>
      </UnorderedList>
      <TitleSection title="Retención de Información" />
      <Text>
        El sistema conservará sus datos personales durante el tiempo que sea
        necesario para los fines establecidos en esta política de privacidad.
      </Text>
      <TitleSection title=" Transferencia de datos personales" />
      <Text>
        Su información, incluidos los Datos personales, se procesarán en el
        sistema. Esto significa que esta información se mantendrá en servidores
        ubicadas fuera de su estado, provincia, país u otra jurisdicción
        gubernamental donde las leyes de protección de datos pueden diferir de
        las de su jurisdicción. Su consentimiento a esta Política de privacidad
        seguido de Su envío de dicha información representa Su acuerdo con esa
        transferencia.
      </Text>
      <TitleSection title="Seguridad de sus datos personales" />
      <Text>
        La seguridad de sus datos personales es importante para nosotros. Pero
        recuerde que ningún método de transmisión por Internet o método de
        almacenamiento electrónico es 100 % seguro.
      </Text>
      <TitleSection title="Cambios a esta Política de Privacidad " />
      <Text>
        Es posible que se actualice nuestra Política de privacidad de vez en
        cuando. Se le notificaremos cualquier cambio publicando la nueva
        Política de privacidad en esta página.
      </Text>
      <TitleSection title="Contáctenos" />
      Si tiene alguna pregunta sobre esta Política de privacidad, puede
      contactarnos: Por correo electrónico: soporte.worksearch@gmail.com
    </Container>
  );
};

export default Politics;
