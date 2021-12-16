-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: SMSSchedulerServer
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ScheduleUsers`
--

DROP TABLE IF EXISTS `ScheduleUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ScheduleUsers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `schedule_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `message_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ScheduleUsers`
--

LOCK TABLES `ScheduleUsers` WRITE;
/*!40000 ALTER TABLE `ScheduleUsers` DISABLE KEYS */;
INSERT INTO `ScheduleUsers` VALUES (1,1,1,'DELIVRD','75b93805-6bc8-444e-9c6a-f16b9b9f87f3','2021-12-16 09:45:40','2021-12-16 12:45:06'),(2,1,2,'UNDELIV','30459098-b48d-4f3c-9eda-95894a81005b','2021-12-16 09:45:40','2021-12-16 12:45:06'),(3,1,3,'UNDELIV','aa30bb50-8322-4bc9-a352-2c91df032f4d','2021-12-16 09:45:40','2021-12-16 12:45:06'),(4,1,4,'UNKNOWN','52824a1e-1fdb-4bae-9fe1-9be08da75241','2021-12-16 09:45:40','2021-12-16 12:45:06'),(5,1,5,'DELIVRD','71acba6b-889e-49ec-b08c-b1de9edb3049','2021-12-16 09:45:40','2021-12-16 12:45:06'),(6,2,1,'DELIVRD','d9abf921-04e6-42a6-9a43-a703ead73d86','2021-12-16 09:45:40','2021-12-16 12:45:06'),(7,2,2,'DELIVRD','9b33bda8-25a2-4490-b6ee-aefe80051c46','2021-12-16 09:45:40','2021-12-16 12:45:06'),(8,2,3,'UNKNOWN','03cd8588-a51e-4313-b5f8-1db63ae21459','2021-12-16 09:45:40','2021-12-16 12:45:06'),(9,2,4,'UNDELIV','d1306cba-4ab2-481d-9399-0299bbd590c9','2021-12-16 09:45:40','2021-12-16 12:45:06'),(10,2,5,'UNDELIV','e205f817-668f-4844-bbb7-463e4188fe29','2021-12-16 09:45:40','2021-12-16 12:45:06'),(11,3,1,'DELIVRD','239e976f-e472-4da4-b833-9d32a79eea9c','2021-12-16 09:45:40','2021-12-16 12:45:06'),(12,3,2,'UNDELIV','2d0ca0dd-37e2-4731-95ea-5c2a843c5b1c','2021-12-16 09:45:40','2021-12-16 12:45:06'),(13,3,3,'UNDELIV','9f84358d-fd83-4a3a-bbdf-624a8bf1cb74','2021-12-16 09:45:40','2021-12-16 12:45:06'),(14,3,4,'UNDELIV','25330535-6f30-4d5b-a00e-c806bbc09fd4','2021-12-16 09:45:40','2021-12-16 12:45:06'),(15,3,5,'UNKNOWN','e709bcb0-8656-48e6-9626-4c8304210c20','2021-12-16 09:45:40','2021-12-16 12:45:06');
/*!40000 ALTER TABLE `ScheduleUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Schedules`
--

DROP TABLE IF EXISTS `Schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `run_at` datetime DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Schedules`
--

LOCK TABLES `Schedules` WRITE;
/*!40000 ALTER TABLE `Schedules` DISABLE KEYS */;
INSERT INTO `Schedules` VALUES (1,'2021-12-05 09:45:40','synthesize auxiliary capacitor','2021-12-16 09:45:40','2021-12-16 09:45:40'),(2,'2021-12-16 09:45:40','connect online pixel','2021-12-16 09:45:40','2021-12-16 09:45:40'),(3,'2021-12-16 09:45:40','synthesize wireless transmitter','2021-12-16 09:45:40','2021-12-16 09:45:40');
/*!40000 ALTER TABLE `Schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20211212162342-create-user.js'),('20211212164303-create-schedule.js'),('20211212164656-create-schedule-user.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Lea','Kyla88@hotmail.com','765-777-7810','JUZid3O2','2021-12-16 09:45:40','2021-12-16 09:45:40'),(2,'Elva','June_Purdy24@yahoo.com','433-363-9297','22v81lVT','2021-12-16 09:45:40','2021-12-16 09:45:40'),(3,'Lilyan','April99@gmail.com','(581) 749-0634 x1620','izaQGwQy','2021-12-16 09:45:40','2021-12-16 09:45:40'),(4,'Arnaldo','Shaniya45@gmail.com','291.361.8354 x982','rY36Fbgo','2021-12-16 09:45:40','2021-12-16 09:45:40'),(5,'Frida','Devonte_Kessler88@yahoo.com','206-738-3222','i_J852j2','2021-12-16 09:45:40','2021-12-16 09:45:40');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'SMSSchedulerServer'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-16 21:09:35
