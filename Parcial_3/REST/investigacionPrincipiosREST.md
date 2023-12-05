# Instituto Tecnológico de Nuevo Laredo

## Información Estudiantil

- **Estudiante:** Juan Hernández Rosas
- **No. Control:** 19100199
- **Materia:** Desarrollo API Rest
- **Docente:** Gerardo Pineda Zapata
# 🚀Principios de la Arquitectura REST 🌐

## 1. Interfaz Uniforme 🛠️

En un enfoque **RESTful**, los servicios se conciben como recursos de la aplicación, cada uno con su propia interfaz de cliente. Estos recursos deben ser pequeños en alcance y volumen de datos, lo que facilita la gestión a través de una única interfaz. Para mantener consistencia, es esencial que los arquitectos traten estos recursos como "sustantivos" (entidades únicas que aceptan entradas y ejecutan instrucciones) en lugar de "verbos". Además, la coherencia en las definiciones de recursos y los diseños de API es crucial para evitar confusiones y errores en el intercambio de datos entre diferentes interfaces. 🤖

## 2. Modelo Cliente-Servidor 🔄

Esta restricción separa la interfaz del usuario (cliente) de la lógica del servidor. Permite que los recursos evolucionen de forma independiente, reduciendo las dependencias y facilitando la colaboración entre equipos de desarrollo. El acoplamiento flexible asegura que los cambios en el servidor no afecten la interfaz del cliente y viceversa. 🌐👥

## 3. Sin Estado (Apátrida) 🌈

La característica clave de esta restricción es que los recursos del servidor no almacenan información entre solicitudes. Cada solicitud se trata de manera independiente, basándose únicamente en la información proporcionada en la solicitud y la operación especificada. Esta propiedad mejora la escalabilidad y la resiliencia de los servicios. 🚫📄
| **Aspecto**      | **Descripción**                                                                                                  |
|-------------------|------------------------------------------------------------------------------------------------------------------|
| **Escalabilidad** | La arquitectura sin estado simplifica el escalamiento horizontal al permitir que los servidores manejen las solicitudes de forma independiente. Esto mejora la solidez del sistema al evitar la sincronización y gestión de estado complejas entre instancias de servidor. |
| **Confiabilidad** | Al no depender de información de solicitudes anteriores, los servidores son más resistentes a las fallas. Pueden continuar procesando solicitudes incluso si una instancia del servidor experimenta problemas.           |
| **Mantenibilidad**| El diseño sin estado simplifica la implementación del servidor al eliminar la necesidad de gestionar y almacenar datos específicos del cliente. Esto reduce el riesgo de errores del lado del servidor relacionados con la gestión del estado del cliente.|


## 4. Almacenable en Caché 🕰️

La arquitectura REST permite el almacenamiento en caché de respuestas del servidor, mejorando así la eficiencia y la velocidad de acceso. Aunque no todo necesita ser almacenado en caché, es crucial identificar las respuestas que pueden beneficiarse de la caché y garantizar que el repositorio de caché pueda manejar nuevas solicitudes de manera efectiva. 📦💽

## 5. Modelo de Sistema en Capas 🏛️

Esta restricción sugiere que una aplicación puede definir recursos asignándolos a capas de funcionalidad, donde cada capa corresponde a una capacidad de servicio compartido. Esta modularidad facilita la gestión de la complejidad y permite que las capacidades de servicio se escalen y evolucionen de manera independiente. 🧱🔄

## 6. Código Bajo Demanda 💻

Esta es una restricción opcional que permite a los recursos RESTful proporcionar código ejecutable en el lado del cliente. Esto puede distribuir la carga de trabajo y mejorar el rendimiento, pero su implementación depende de la capacidad de ejecución de código del cliente y debe realizarse con precaución para garantizar la compatibilidad entre los componentes de la aplicación. ⚙️🔄

En conjunto, estas restricciones definen un conjunto de principios que, cuando se siguen, permiten el diseño de sistemas web que son eficientes, escalables y capaces de evolucionar de manera independiente en diferentes capas y componentes. 🌐✨

## Cumplimiento

Cumplir con estas restricciones es ajustarse al estilo arquitectónico REST. Adoptarlo permitirá que cualquier tipo de sistema de hipermedios distribuido tenga propiedades emergentes deseables, tales como rendimiento, escalabilidad, simplicidad, modificabilidad, visibilidad, portabilidad y confiabilidad. La única restricción opcional de la arquitectura REST es el código bajo demanda. Si un servicio viola cualquier otra restricción, no puede referirse estrictamente como RESTful.

![Api Rest](https://eravila.files.wordpress.com/2018/07/rest-api-basics.png)

## Diseño

El diagrama de abajo muestra gráficamente lo que el diseño de una REST API debe considerar y las interrelaciones entre estas consideraciones.

![Design](https://eravila.files.wordpress.com/2021/12/restapi-design.png)

# Bibliografía

1. Krypton Solid. (s.f.). [*Las 6 Restricciones de la Arquitectura REST No Negociables.*](https://kryptonsolid.com/las-6-restricciones-de-la-arquitectura-rest-no-negociables/?expand_article=1)

2. Scriniun. (s.f.). [*Principios Fundamentales de Arquitectura RESTful.*](https://www.scriniun.com/post/Ldg3l-principios-fundamentales-de-arquitectura-restful)

3. AppMaster. (s.f.). [*Principios de Diseño que Descansan.*](https://appmaster.io/es/blog/principios-de-diseno-descansan)

4. Dredu. (s.f.). [*REST - Representational State Transfer.*](https://dredu.mx/principal/intereses/profesionales/informatica/clouds/rest/)
