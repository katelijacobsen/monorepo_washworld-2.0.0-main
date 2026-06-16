-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Vært: mariadb
-- Genereringstid: 26. 05 2026 kl. 05:01:56
-- Serverversion: 10.6.20-MariaDB-ubu2004
-- PHP-version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wash_world`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `cars`
--

CREATE TABLE `cars` (
  `car_pk` char(32) NOT NULL,
  `car_licenseplate` varchar(10) NOT NULL,
  `car_most_recent_wash` bigint(20) UNSIGNED NOT NULL,
  `car_image` varchar(255) NOT NULL,
  `car_created_at` bigint(20) UNSIGNED NOT NULL,
  `car_updated_at` bigint(20) UNSIGNED NOT NULL,
  `car_deleted_at` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Data dump for tabellen `cars`
--

INSERT INTO `cars` (`car_pk`, `car_licenseplate`, `car_most_recent_wash`, `car_image`, `car_created_at`, `car_updated_at`, `car_deleted_at`) VALUES
('6f6a9cf7370546eb8a6a63aa3435ab97', 'AB12345', 65421, 'fuck', 12345678912, 4525654, 56465456);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `cases`
--

CREATE TABLE `cases` (
  `case_pk` char(32) NOT NULL,
  `car_fk` char(32) NOT NULL,
  `case_status_fk` char(32) NOT NULL,
  `case_number` char(32) NOT NULL,
  `case_description` varchar(1000) NOT NULL,
  `case_document` varchar(255) NOT NULL,
  `case_created_at` bigint(20) UNSIGNED NOT NULL,
  `case_updated_at` bigint(20) UNSIGNED NOT NULL,
  `case_deleted_at` bigint(20) UNSIGNED NOT NULL,
  `case_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `case_status`
--

CREATE TABLE `case_status` (
  `case_status_pk` char(32) NOT NULL,
  `case_status_title` varchar(50) NOT NULL,
  `case_status_created_at` char(32) NOT NULL,
  `case_status_updated_at` char(32) NOT NULL,
  `case_status_deleted_at` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `facilities`
--

CREATE TABLE `facilities` (
  `facility_pk` char(32) NOT NULL,
  `facility_name` char(2) NOT NULL,
  `facility_created_at` bigint(20) UNSIGNED NOT NULL,
  `facility_updated_at` bigint(20) UNSIGNED NOT NULL,
  `facility_deleted_at` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `feedback`
--

CREATE TABLE `feedback` (
  `feedback_pk` char(32) NOT NULL,
  `feedback_rating` int(11) NOT NULL,
  `feedback_description` varchar(1000) NOT NULL,
  `feedback_created_at` bigint(20) UNSIGNED NOT NULL,
  `feedback_updated_at` bigint(20) UNSIGNED NOT NULL,
  `feedback_deleted_at` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `locations`
--

CREATE TABLE `locations` (
  `location_pk` char(32) NOT NULL,
  `location_title` varchar(255) NOT NULL,
  `location_latitude` decimal(8,6) NOT NULL,
  `location_longtitude` decimal(9,6) NOT NULL,
  `location_city` varchar(255) NOT NULL,
  `location_address` varchar(255) NOT NULL,
  `location_status_fk` char(32) NOT NULL,
  `location_created_at` bigint(20) UNSIGNED NOT NULL,
  `location_updated_at` bigint(20) UNSIGNED NOT NULL,
  `location_deleted_at` bigint(20) UNSIGNED NOT NULL,
  `location_selfwash_max` char(2) NOT NULL,
  `location_carwash_max` char(2) NOT NULL,
  `location_insideclean_max` char(2) NOT NULL,
  `location_selfwash_in_use` char(2) NOT NULL,
  `location_carwash_in_use` char(2) NOT NULL,
  `location_insideclean_in_use` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Data dump for tabellen `locations`
--

INSERT INTO `locations` (`location_pk`, `location_title`, `location_latitude`, `location_longtitude`, `location_city`, `location_address`, `location_status_fk`, `location_created_at`, `location_updated_at`, `location_deleted_at`, `location_selfwash_max`, `location_carwash_max`, `location_insideclean_max`, `location_selfwash_in_use`, `location_carwash_in_use`, `location_insideclean_in_use`) VALUES
('02986d640416422dbdbbff58901f97d7', 'Test Location', 55.676098, 12.568337, 'Copenhagen', 'Testvej 12', '11111111111111111111111111111111', 1716472800, 1716472800, 0, '06', '04', '02', '01', '02', '00'),
('0f4f2e8c3b624f9b8c4a8f5e1d2c3b10', 'Copenhagen City', 55.676098, 12.568337, 'Copenhagen', 'Testvej 12', '11111111111111111111111111111111', 1716472800, 0, 0, '06', '04', '02', '01', '02', '00'),
('1a7c9e4f6b2d4c3e9f8a7b6c5d4e3f20', 'Aarhus North', 56.162939, 10.203921, 'Aarhus', 'Vaskevej 8', '11111111111111111111111111111111', 1716472800, 0, 0, '08', '05', '03', '02', '01', '01'),
('2b8d0f5a7c3e4d9f8a1b2c3d4e5f6a30', 'Odense East', 55.403756, 10.402370, 'Odense', 'Bilplejevej 22', '11111111111111111111111111111111', 1716472800, 0, 0, '05', '03', '02', '00', '01', '00'),
('3c9e1a6b8d4f5e0a9b2c3d4e5f6a7b40', 'Aalborg West', 57.048820, 9.921747, 'Aalborg', 'Skumgade 5', '11111111111111111111111111111111', 1716472800, 0, 0, '10', '06', '04', '03', '02', '01'),
('4d0f2b7c9e5a6f1b8c3d4e5f6a7b8c50', 'Esbjerg Harbor', 55.476466, 8.459405, 'Esbjerg', 'Havnegade 18', '11111111111111111111111111111111', 1716472800, 0, 0, '04', '02', '02', '01', '00', '01'),
('5e1a3c8d0f6b7a2c9d4e5f6a7b8c9d60', 'Randers South', 56.460584, 10.036539, 'Randers', 'Motorvej 44', '11111111111111111111111111111111', 1716472800, 0, 0, '07', '04', '03', '02', '02', '00'),
('6f2b4d9e1a7c8b3d0e5f6a7b8c9d0e70', 'Kolding Center', 55.490400, 9.472200, 'Kolding', 'Centrumvej 3', '11111111111111111111111111111111', 1716472800, 0, 0, '06', '03', '01', '01', '01', '00'),
('7a3c5e0f2b8d9c4e1f6a7b8c9d0e1f80', 'Roskilde Station', 55.641910, 12.087845, 'Roskilde', 'Stationsvej 27', '11111111111111111111111111111111', 1716472800, 0, 0, '09', '05', '03', '04', '01', '02'),
('8b4d6f1a3c9e0d5f2a7b8c9d0e1f2a90', 'Vejle North', 55.711311, 9.536354, 'Vejle', 'Nordvej 14', '11111111111111111111111111111111', 1716472800, 0, 0, '05', '04', '02', '00', '02', '01'),
('9c5e7a2b4d0f1e6a3b8c9d0e1f2a3b00', 'Herning West', 56.138557, 8.967322, 'Herning', 'Vestergade 31', '11111111111111111111111111111111', 1716472800, 0, 0, '08', '06', '04', '03', '03', '01');

-- Rigtige Wash World-lokationer importeret fra https://washworld.dk/wp-json/ww/v1/locations?country=da (11-06-2026)
INSERT INTO `locations` (`location_pk`, `location_title`, `location_latitude`, `location_longtitude`, `location_city`, `location_address`, `location_status_fk`, `location_created_at`, `location_updated_at`, `location_deleted_at`, `location_selfwash_max`, `location_carwash_max`, `location_insideclean_max`, `location_selfwash_in_use`, `location_carwash_in_use`, `location_insideclean_in_use`) VALUES
('f4e46333e42b40eba52432958528ebe3', 'Aabenraa - Egevej', 55.065643, 9.364450, 'Aabenraa', 'Egevej 4, 6200 Aabenraa', '11111111111111111111111111111111', 1781167488, 0, 0, '01', '01', '00', '00', '00', '00'),
('64a3a9bcdbd943d0bc63faa09291b02d', 'Aalborg - Otto Mønstedsvej', 57.015248, 9.896256, 'Aalborg', 'Otto Mønsteds Vej 5, 9200 Aalborg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('871ef6dd8d06490788745ac9694af73d', 'Aalborg, Gug - Gammel Vissevej', 57.006314, 9.925946, 'Aalborg - Gug', 'Gammel Vissevej 1C, 9210 Aalborg - Gug', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('338e13381ed043889a1e7a7f4d3b2607', 'Ballerup - Industriparken', 55.728714, 12.373295, 'Ballerup', 'Industriparken 6, 2750 Ballerup', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '02', '00', '00', '00'),
('003f5bc8038e4b11ad78c67b3679102f', 'Brande - Vestergårdsvej', 55.960647, 9.103426, 'Brande', 'Vestergårdsvej 3, 7330 Brande', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '01', '00', '00', '00', '00'),
('b1dcb93d232e489aae2d3050a07d3628', 'Brøndby Strand - Gl. Køge Landevej', 55.618231, 12.423950, 'Brøndby Strand', 'Gammel Køge Landevej 690, 2660 Brøndby Strand', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '02', '00', '00', '00'),
('1cb16453a21f41188534119ec7f824e8', 'Ebeltoft - Færgevejen', 56.190809, 10.672123, 'Ebeltoft', 'Færgevejen 3, 8400 Ebeltoft', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '01', '00', '00', '00', '00'),
('9532650d73ab43dca4f1c0ba30d59ed8', 'Esbjerg - Sædding Ringvej', 55.503728, 8.407419, 'Esbjerg', 'Sædding Ringvej 6, 6710 Esbjerg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('d96d16d506a24f0dbe84e07de597e880', 'Farum - Gammelgårdsvej', 55.816943, 12.370350, 'Farum', 'Gammelgårdsvej 84, 3520 Farum', '11111111111111111111111111111111', 1781167488, 0, 0, '03', '03', '02', '00', '00', '00'),
('fa0cb2d0be474560890834eaa189ef60', 'Fredericia - Strevelinsvej', 55.535519, 9.718700, 'Fredericia', 'Strevelinsvej 5, 7000 Fredericia', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '03', '02', '00', '00', '00'),
('6c5468d912d847c78c388613f421bad5', 'Fredericia - Vejlevej', 55.569691, 9.727622, 'Fredericia', 'Vejlevej 20, 7000 Fredericia', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('81fbdb0d50494017b0ab5515bbc6e5d2', 'Frederikshavn - Apholmenvej', 57.462193, 10.519448, 'Frederikshavn', 'Apholmenvej 9, 9900 Frederikshavn', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '00', '00', '00', '00'),
('989abfaf735a4fe78089e6c99b118e25', 'Frederikssund - Askelundsvej', 55.845151, 12.074291, 'Frederikssund', 'Askelundsvej 8, 3600 Frederikssund', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('7481043e383f4f43af67ffd5c6c996e0', 'Frederiksværk - Hanehovedvej', 55.977559, 12.007447, 'Frederiksværk', 'Hanehovedvej 49, 3300 Frederiksværk', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('25c2e25250bc4ee7ab93b32397e4b74d', 'Grenå - Hesselvang', 56.383895, 10.864451, 'Grenå', 'Hesselvang 1, 8500 Grenå', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '01', '00', '00', '00', '00'),
('c4ae7dc6e762461281c19d22ef17dcc6', 'Haderslev - Sverigesvej', 55.259211, 9.474129, 'Haderslev', 'Sverigesvej 2M, 6100 Haderslev', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '00', '00', '00', '00'),
('d35aa9ad5f9e4f11ae3d71e564311c8a', 'Helsingør - Klostermosevej', 56.024018, 12.571863, 'Helsingør', 'Klostermosevej 103, 3000 Helsingør', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '00', '00', '00', '00'),
('4259345c0e4741d281cdacc711ac9884', 'Herlev - Nørrelundvej', 55.725365, 12.416697, 'Herlev', 'Nørrelundvej 2, 2730 Herlev', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '00', '00', '00', '00'),
('9132d5e9d9bf43ec8d12cea20e6b06d1', 'Herning - Dæmningen', 56.132141, 8.959350, 'Herning', 'Dæmningen 21, 7400 Herning', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('ad8e4d206bd3496ba83148aec0e430cc', 'Herning - Guldborgvej', 56.153554, 8.984745, 'Herning', 'Guldborgvej 2-4, 7400 Herning', '11111111111111111111111111111111', 1781167488, 0, 0, '01', '02', '00', '00', '00', '00'),
('288751f064c34b2baf27ec5c491eb35c', 'Hillerød - Industrivænget', 55.931481, 12.282996, 'Hillerød', 'Industrivænget 3, 3400 Hillerød', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '00', '00', '00', '00'),
('6fcea7d82a8245ba86a4da81943c1009', 'Hjørring - Sprogøvej', 57.455594, 10.039465, 'Hjørring', 'Sprogøvej 2, 9800 Hjørring', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('e448ea6f5b664dcdb660e5fdaa905082', 'Holbæk - Springstrup', 55.703026, 11.666091, 'Holbæk', 'Springstrup 5, 4300 Holbæk', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '03', '02', '00', '00', '00'),
('b86ddb971a504869bd2a5782d21f6ecd', 'Holstebro - Nybo Bakke', 56.341889, 8.635395, 'Holstebro', 'Nybo Bakke 2, 7500 Holstebro', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('5ba15a20134542a5bc3ca1ad64dd1221', 'Horsens - Vejlevej', 55.833085, 9.804744, 'Horsens', 'Vejlevej 102, 8700 Horsens', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '00', '00', '00', '00'),
('1904051478314126a28b7fa140064a35', 'Højbjerg - Bjødstrupvej', 56.107525, 10.166967, 'Højbjerg', 'Bjødstrupvej 20E, 8270 Højbjerg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('98300c6081074588b6af2f9e39fbea73', 'Ikast - Europavej', 56.123699, 9.175422, 'Ikast', 'Europavej 3, 7430 Ikast', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '01', '00', '00', '00', '00'),
('0769780ac80944ffbc963026ef9028dc', 'Ishøj - Vejleåvej', 55.623385, 12.321167, 'Ishøj', 'Vejleåvej 19, 2635 Ishøj', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '00', '00', '00', '00'),
('d8e1455ddec348c694d5c0ae67c4e09f', 'Kalundborg - Holbækvej', 55.678767, 11.135830, 'Kalundborg', 'Holbækvej 74, 4400 Kalundborg', '11111111111111111111111111111111', 1781167488, 0, 0, '01', '02', '00', '00', '00', '00'),
('5eb58fe1b53c4c3f8e86b9fba781ed65', 'Kolding - Vejlevej 132', 55.504039, 9.458227, 'Kolding', 'Vejlevej 132, 6000 Kolding', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('fcc8e7283b074a9290e16985fd8d1d83', 'Kolding - Vejlevej 251', 55.513664, 9.454697, 'Kolding', 'Vejlevej 251, 6000 Kolding', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '03', '02', '00', '00', '00'),
('8c7be516170747778de1c1f90c482b7b', 'Køge - Københavnsvej', 55.471805, 12.181953, 'Køge', 'Københavnsvej 86, 4600 Køge', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '02', '00', '00', '00'),
('18ccd2dbcb814051af5c6a9861303b23', 'Lystrup - Lægårdsvej', 56.225669, 10.238525, 'Lystrup', 'Lægårdsvej 4, 8520 Lystrup', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('f0d4369dfcdf4634b1bc456643382e9f', 'Middelfart - Skovsvinget', 55.512013, 9.766181, 'Middelfart', 'Skovsvinget 27c, 5500 Middelfart', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('b3d5d6d2e06b46fc89ec3602daeee41c', 'Nakskov - Løjtoftevej', 54.832475, 11.149662, 'Nakskov', 'Løjtoftevej 6, 4900 Nakskov', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '01', '00', '00', '00', '00'),
('376bd98b0fe444fdbae583baeb6236bd', 'Nyborg - Storebæltsvej', 55.308498, 10.809624, 'Nyborg', 'Storebæltsvej 7F, 5800 Nyborg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('308269b2a9db4c529f88cce71d732b57', 'Nykøbing Falster - Guldborgsundcentret', 54.758801, 11.851437, 'Nykøbing Falster', 'Guldborgsundcentret 32, 4800 Nykøbing Falster', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('cdcbbb988ea640f6978a6d3173c55dd4', 'Næstved - Erantisvej', 55.239173, 11.777977, 'Næstved', 'Erantisvej 52, 4700 Næstved', '11111111111111111111111111111111', 1781167488, 0, 0, '01', '03', '00', '00', '00', '00'),
('a0bba8930fe64a84a75ac4cf01a5f9c8', 'Næstved - Gl. Holstedvej', 55.249681, 11.782031, 'Næstved', 'Gammel Holstedvej 1, 4700 Næstved', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('c77d99aa119140a6b55a79cc9563e0db', 'Nørresundby - Loftbrovej', 57.089142, 9.969241, 'Nørresundby', 'Loftbrovej 2, 9400 Nørresundby', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '02', '02', '00', '00', '00'),
('880cd42cebdb4c4f993dac8b6b748da9', 'Odense - Nyborgvej', 55.391530, 10.435819, 'Odense', 'Nyborgvej 343, 5220 Odense', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '03', '00', '00', '00', '00'),
('0f7b70d80baf4e919510252002e6e962', 'Odense SØ - Ørbækvej', 55.379874, 10.433066, 'Odense SØ', 'Ørbækvej 99, 5220 Odense SØ', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('95db5dcfb0304180aec0cf26cacab37e', 'Odense V - Bystævnevej', 55.395026, 10.346525, 'Odense', 'Bystævnevej 5, 5200 Odense', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '03', '02', '00', '00', '00'),
('83e3b6586ed94a238f2d56b9dd1cca6f', 'Randers - Messingvej', 56.430362, 10.053815, 'Randers', 'Messingvej 10, 8940 Randers', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '02', '00', '00', '00'),
('760b36aa813a4b17a0a18136b99349d5', 'Randers - Udbyhøjvej', 56.466047, 10.054250, 'Randers', 'Udbyhøjvej 7, 8930 Randers', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('c57fbe5c861f4495bd9ed02fb7bd6c64', 'Ribe - Trojels Knæ', 55.351485, 8.780311, 'Ribe', 'Trojels Knæ 6, 6760 Ribe', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '01', '00', '00', '00', '00'),
('daab82e4dd7744ff90812d4082cc45fa', 'Ringsted - Frejasvej', 55.430669, 11.801419, 'Ringsted', 'Frejasvej 43, 4100 Ringsted', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('b9e91870fcf44c8fa3e865dc1717883c', 'Ringsted - Nørregade', 55.451392, 11.790082, 'Ringsted', 'Nørregade 70, 4100 Ringsted', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('7b1ab0f57aee4f0db4958d83159bca3b', 'Risskov - Ravnsøvej', 56.202062, 10.244490, 'Risskov', 'Ravnsøvej 48B, 8240 Risskov', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('0b6a6bac6fee4ac19057ae01d1adc1cf', 'Roskilde - Byleddet', 55.643709, 12.109114, 'Roskilde', 'Byleddet 2, 4000 Roskilde', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('03e7bb70bf004b13a22855ef7a41e4d1', 'Roskilde - Ringstedvej', 55.628427, 12.066559, 'Roskilde', 'Ringstedvej 73, 4000 Roskilde', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('7d823666255b416ab29a06e6816a0a54', 'Silkeborg - Nordre Ringvej', 56.181413, 9.536954, 'Silkeborg', 'Nordre Ringvej 90, 8600 Silkeborg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '02', '00', '00', '00'),
('304e7b37f8b647b38fbe3f3600d1aa1d', 'Skive - Øster Fælled vej', 56.561567, 9.039567, 'Skive', 'Øster Fælled vej 4, 7800 Skive', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '02', '00', '00', '00'),
('2260bf906796487185b31ead019a65dc', 'Slagelse - Idagårdsvej', 55.391735, 11.353002, 'Slagelse', 'Idagårdsvej 2, 4200 Slagelse', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('32b253c5dd2f4f25a150ada67b86e76e', 'Slagelse - Smedegade', 55.407685, 11.367846, 'Slagelse', 'Smedegade 77, 4200 Slagelse', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('def04cd2aedb4dbf97184c94d603373b', 'Sorø - Apotekervej', 55.445137, 11.563255, 'Sorø', 'Apotekervej 14, 4180 Sorø', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('2181202d20fc49a6869076f413703768', 'Struer - Bredgade', 56.480435, 8.585535, 'Struer', 'Bredgade 58, 7600 Struer', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '01', '00', '00', '00', '00'),
('4649f39cb75c45cfb23f8d6ec62a8222', 'Svendborg - Nyborgvej', 55.062893, 10.618592, 'Svendborg', 'Nyborgvej 4, 5700 Svendborg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('931894c14b46483086773db2f3858d99', 'Svendborg - Odensevej', 55.072950, 10.582398, 'Svendborg', 'Odensevej 94, 5700 Svendborg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('5954b9ee205c40548e2ceb94b444bf49', 'Søborg - Dynamovej', 55.733731, 12.459961, 'Søborg', 'Dynamovej 4, 2860 Søborg', '11111111111111111111111111111111', 1781167488, 0, 0, '03', '04', '06', '00', '00', '00'),
('2c9c7a8f222c4f0cb4c2c69e7d17c07a', 'Sønderborg - Centerpassagen', 54.919430, 9.808034, 'Sønderborg', 'Centerpassagen 4, 6400 Sønderborg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '03', '00', '00', '00', '00'),
('2528cb5ce5ba4859a904b8fd4acc97bc', 'Taastrup - Roskildevej', 55.658037, 12.294712, 'Taastrup', 'Roskildevej 376, 2630 Taastrup', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '03', '04', '00', '00', '00'),
('50e0205053684c3787bba0c07d98bedb', 'Thisted - Østerbakken', 56.968852, 8.735134, 'Thisted', 'Østerbakken 111, 7700 Thisted', '11111111111111111111111111111111', 1781167488, 0, 0, '02', '01', '00', '00', '00', '00'),
('7e3f2074a14245eeac448423916db470', 'Tilst - Blomstervej', 56.181787, 10.125000, 'Tilst', 'Blomstervej 2T, 8381 Tilst', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('a10c57c6a36048deb42feb136e5ef339', 'Tønder - Centerbuen', 54.951505, 8.887800, 'Tønder', 'Centerbuen 5, 6270 Tønder', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '01', '00', '00', '00', '00'),
('0aaca3760a194264b83445a07ab75346', 'Vejle - Soldalen', 55.681238, 9.567456, 'Vejle', 'Soldalen 4, 7100 Vejle', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('f625cb117ece4a85aceef6afbf8b33bb', 'Vejle - Solkilde Allé', 55.723459, 9.584778, 'Vejle', 'Solkilde Alle 11, 7100 Vejle', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('8c2b4294bb7a41979aba81be776b5245', 'Viborg - Falkevej', 56.444161, 9.388456, 'Viborg', 'Falkevej 25, 8800 Viborg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('da08c6f7ebfe4e93aed0032245d00034', 'Viborg - Vognmagervej', 56.469366, 9.409431, 'Viborg', 'Vognmagervej 21E, 8800 Viborg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00'),
('b62ecacb116344068c491fa054f1628f', 'Viby - Gunnar Clausens vej', 56.111373, 10.125033, 'Viby', 'Gunnar Clausens Vej 2A, 8260 Viby', '11111111111111111111111111111111', 1781167488, 0, 0, '01', '02', '00', '00', '00', '00'),
('e290f306e7224379997418c59950c058', 'Vordingborg - Valdemarsgade', 55.010855, 11.910489, 'Vordingborg', 'Valdemarsgade 57, 4760 Vordingborg', '11111111111111111111111111111111', 1781167488, 0, 0, '00', '02', '00', '00', '00', '00');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `location_facilities`
--

CREATE TABLE `location_facilities` (
  `location_facilities_pk` char(32) NOT NULL,
  `facilities_fk` char(32) NOT NULL,
  `location_fk` char(32) NOT NULL,
  `location_facilities_created_at` char(32) NOT NULL,
  `location_facilities_updated_at` char(32) NOT NULL,
  `location_facilities_deleted_at` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `location_status`
--

CREATE TABLE `location_status` (
  `location_status_pk` char(32) NOT NULL,
  `location_status_title` varchar(50) NOT NULL,
  `location_status_created_at` char(32) NOT NULL,
  `location_status_updated_at` char(32) NOT NULL,
  `location_status_deleted_at` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Data dump for tabellen `location_status`
--

INSERT INTO `location_status` (`location_status_pk`, `location_status_title`, `location_status_created_at`, `location_status_updated_at`, `location_status_deleted_at`) VALUES
('11111111111111111111111111111111', 'ITS A STATUS', '123', '456', '0');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `paymentmethods`
--

CREATE TABLE `paymentmethods` (
  `paymentmethods_pk` char(32) NOT NULL,
  `paymentmethods_title` varchar(100) NOT NULL,
  `paymentmethods_created_at` bigint(20) UNSIGNED NOT NULL,
  `paymentmethods_updated_at` bigint(20) UNSIGNED NOT NULL,
  `paymentmethods_deleted_at` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `payment_frequency`
--

CREATE TABLE `payment_frequency` (
  `payment_frequency_pk` char(32) NOT NULL,
  `payment_frequency_title` varchar(50) NOT NULL,
  `payment_frequency_created_at` char(32) NOT NULL,
  `payment_frequency_updated_at` char(32) NOT NULL,
  `payment_frequency_deleted_at` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `plans`
--

CREATE TABLE `plans` (
  `plan_pk` char(32) NOT NULL,
  `payment_frequency_fk` char(32) NOT NULL,
  `plan_price` decimal(5,2) NOT NULL,
  `plans_status_fk` char(32) NOT NULL,
  `plan_title` varchar(50) NOT NULL,
  `plan_created_at` char(32) NOT NULL,
  `plan_updated_at` char(32) NOT NULL,
  `plan_deleted_at` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `plans_status`
--

CREATE TABLE `plans_status` (
  `plans_status_pk` char(32) NOT NULL,
  `plans_status_title` varchar(50) NOT NULL,
  `plans_status_created_at` char(32) NOT NULL,
  `plans_status_updated_at` char(32) NOT NULL,
  `plans_status_deleted_at` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `receipts`
--

CREATE TABLE `receipts` (
  `receipt_pk` char(32) NOT NULL,
  `car_fk` char(32) NOT NULL,
  `plans_fk` char(32) NOT NULL,
  `receipt_number` char(32) NOT NULL,
  `receipt_amount` decimal(5,2) NOT NULL,
  `receipt_status_fk` char(32) NOT NULL,
  `receipt_valid_until` bigint(20) UNSIGNED NOT NULL,
  `location_fk` char(32) NOT NULL,
  `receipt_document` varchar(255) NOT NULL,
  `receipt_created_at` bigint(20) UNSIGNED NOT NULL,
  `receipt_updated_at` bigint(20) UNSIGNED NOT NULL,
  `receipt_deleted_at` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `receipt_status`
--

CREATE TABLE `receipt_status` (
  `receipt_status_pk` char(32) NOT NULL,
  `receipt_status_title` varchar(50) NOT NULL,
  `receipt_status_created_at` char(32) NOT NULL,
  `receipt_status_updated_at` char(32) NOT NULL,
  `receipt_status_deleted_at` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `user_pk` char(32) NOT NULL,
  `user_fullname` varchar(255) NOT NULL,
  `user_phonenumber` varchar(16) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_created_at` bigint(20) UNSIGNED NOT NULL,
  `user_updated_at` bigint(20) UNSIGNED NOT NULL,
  `user_deleted_at` bigint(20) UNSIGNED NOT NULL,
  `user_verification_key` char(32) NOT NULL,
  `user_reset_password_key` char(32) NOT NULL,
  `user_img_key` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`user_pk`, `user_fullname`, `user_phonenumber`, `user_email`, `user_password`, `user_address`, `user_created_at`, `user_updated_at`, `user_deleted_at`, `user_verification_key`, `user_reset_password_key`, `user_img_key`) VALUES
('0367f628e9e24888b07d30ca5a0b1b85', 'mai E.', '12345678', 'Mai_Ez@outlook.dk', 'scrypt:32768:8:1$hsTOYwRfrYZm74K1$42d9e4567be514df96d7d0eae494ac09ae8faa54578b54e44e60595aa8dd53b5b2c03cf3b72b0f081ab3ed2d3695aa9cf7ba76b400d5a0d93d9fbc51ac048e19', 'asdfasdf', 1779752532, 0, 0, 'ee06b428663f44b49100c4cd74ae47c9', '', ''),
('5a2546fa3bff4bc397ead186c51a3217', 'Katja A', '91996396', 'katjamaehleke98@gmail.com', 'scrypt:32768:8:1$mj71q3c8EWTpfWO6$439ad119ca1c299070a50dfa32d6deb4f5d3945706e88238d0d0e1f3b28c6dc1a8e28c53f195e15443c0c287896bcf5ff155263353a819206a0e5c26f4510dc7', 'sdsdsdsdsd', 1779772774, 1779771126, 0, '2eeb7667d9f14b7680d87d0694bff46f', '', '5275c4303dcd476891cef11989420a63_Skærmbillede 2026-04-03 101634.png'),
('eea23ece4bf2459aa92934f281332551', 'Kat', '12345678', 'kat@kat.com', 'scrypt:32768:8:1$68kferCjuHGAHwy5$a52dfc350a1de3cd62dde8475e354611b38e3a76e88e5974f7efc7e0b41c6604ee763cef4c6a29ed7bc79834db9dff11bd58cdd59255cec0de2004e713c514fc', '[object HTMLCollection]', 1779498896, 0, 0, '', '', ''),
('f96772b4f2ef48aa91add8fb65e9cbe7', 'Mai', '12345678', 'aa@aa.dk', 'scrypt:32768:8:1$JfejFMspGZECjehz$fceb82fea3ee2858af5b7206899828dde8e8185bc7d83c242776324c9f4f95cf4e49d3f1b5299161b5c6765da48d030a92ce38f3b8a6d77110b2324a4c65db65', 'sadfsdfasd', 1779529544, 0, 0, '', '', '');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `user_car`
--

CREATE TABLE `user_car` (
  `user_car_pk` char(32) NOT NULL,
  `user_fk` char(32) NOT NULL,
  `car_fk` char(32) NOT NULL,
  `user_car_created_at` char(32) NOT NULL,
  `user_car_updated_at` char(32) NOT NULL,
  `user_car_deleted_at` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `user_feedback`
--

CREATE TABLE `user_feedback` (
  `user_feedback_pk` char(32) NOT NULL,
  `user_feedback_created_at` bigint(20) UNSIGNED NOT NULL,
  `user_feedback_updated_at` bigint(20) UNSIGNED NOT NULL,
  `user_feedback_deleted_at` bigint(20) UNSIGNED NOT NULL,
  `user_fk` char(32) NOT NULL,
  `feedback_fk` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `user_paymentmethods`
--

CREATE TABLE `user_paymentmethods` (
  `user_paymentmethods_pk` char(32) NOT NULL,
  `user_fk` char(32) NOT NULL,
  `paymentmethods_fk` varchar(255) NOT NULL,
  `user_paymentmethods_created_at` bigint(20) NOT NULL,
  `user_paymentmethods_updated_at` bigint(20) NOT NULL,
  `user_paymentmethods_deleted_at` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `wash_services`
--

CREATE TABLE `wash_services` (
  `wash_services_pk` char(32) NOT NULL,
  `wash_services_title` varchar(50) NOT NULL,
  `wash_services_created_at` char(32) NOT NULL,
  `wash_services_updated_at` char(32) NOT NULL,
  `wash_services_deleted_at` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`car_pk`),
  ADD UNIQUE KEY `car_licenseplate` (`car_licenseplate`);

--
-- Indeks for tabel `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`case_pk`),
  ADD UNIQUE KEY `case_number` (`case_number`),
  ADD KEY `case_status_fk` (`case_status_fk`),
  ADD KEY `car_fk_to_cases` (`car_fk`);

--
-- Indeks for tabel `case_status`
--
ALTER TABLE `case_status`
  ADD PRIMARY KEY (`case_status_pk`);

--
-- Indeks for tabel `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`facility_pk`);

--
-- Indeks for tabel `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_pk`);

--
-- Indeks for tabel `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`location_pk`),
  ADD KEY `location_status_fk` (`location_status_fk`);

--
-- Indeks for tabel `location_facilities`
--
ALTER TABLE `location_facilities`
  ADD PRIMARY KEY (`location_facilities_pk`),
  ADD KEY `facilities_fk_to_locationfacilities` (`facilities_fk`) USING BTREE,
  ADD KEY `location_fk_to_locationfacilities` (`location_fk`);

--
-- Indeks for tabel `location_status`
--
ALTER TABLE `location_status`
  ADD PRIMARY KEY (`location_status_pk`);

--
-- Indeks for tabel `paymentmethods`
--
ALTER TABLE `paymentmethods`
  ADD PRIMARY KEY (`paymentmethods_pk`),
  ADD UNIQUE KEY `paymentmethods_title` (`paymentmethods_title`);

--
-- Indeks for tabel `payment_frequency`
--
ALTER TABLE `payment_frequency`
  ADD PRIMARY KEY (`payment_frequency_pk`);

--
-- Indeks for tabel `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`plan_pk`),
  ADD KEY `payment_frequency_fk` (`payment_frequency_fk`),
  ADD KEY `plans_status_fk` (`plans_status_fk`);

--
-- Indeks for tabel `plans_status`
--
ALTER TABLE `plans_status`
  ADD PRIMARY KEY (`plans_status_pk`);

--
-- Indeks for tabel `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`receipt_pk`),
  ADD UNIQUE KEY `receipt_number` (`receipt_number`),
  ADD KEY `membership_fk` (`plans_fk`),
  ADD KEY `receipt_status_fk` (`receipt_status_fk`),
  ADD KEY `location_fk` (`location_fk`),
  ADD KEY `receipt_car_fk` (`car_fk`);

--
-- Indeks for tabel `receipt_status`
--
ALTER TABLE `receipt_status`
  ADD PRIMARY KEY (`receipt_status_pk`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_pk`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Indeks for tabel `user_car`
--
ALTER TABLE `user_car`
  ADD PRIMARY KEY (`user_car_pk`),
  ADD KEY `user_fk` (`user_fk`),
  ADD KEY `car_fk` (`car_fk`);

--
-- Indeks for tabel `user_feedback`
--
ALTER TABLE `user_feedback`
  ADD PRIMARY KEY (`user_feedback_pk`),
  ADD KEY `user_feedback_user_fk` (`user_fk`),
  ADD KEY `user_feedback_feedback_fk` (`feedback_fk`);

--
-- Indeks for tabel `user_paymentmethods`
--
ALTER TABLE `user_paymentmethods`
  ADD PRIMARY KEY (`user_paymentmethods_pk`),
  ADD KEY `user_paymentmethods_user_fk` (`user_fk`),
  ADD KEY `user_paymentmethods_paymentmethods_fk` (`paymentmethods_fk`);

--
-- Indeks for tabel `wash_services`
--
ALTER TABLE `wash_services`
  ADD PRIMARY KEY (`wash_services_pk`);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `car_fk_to_cases` FOREIGN KEY (`car_fk`) REFERENCES `cars` (`car_pk`),
  ADD CONSTRAINT `case_status_fk` FOREIGN KEY (`case_status_fk`) REFERENCES `case_status` (`case_status_pk`);

--
-- Begrænsninger for tabel `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `location_status_fk` FOREIGN KEY (`location_status_fk`) REFERENCES `location_status` (`location_status_pk`);

--
-- Begrænsninger for tabel `location_facilities`
--
ALTER TABLE `location_facilities`
  ADD CONSTRAINT `facilities_fk` FOREIGN KEY (`facilities_fk`) REFERENCES `facilities` (`facility_pk`),
  ADD CONSTRAINT `location_fk_to_locationfacilities` FOREIGN KEY (`location_fk`) REFERENCES `locations` (`location_pk`);

--
-- Begrænsninger for tabel `plans`
--
ALTER TABLE `plans`
  ADD CONSTRAINT `payment_frequency_fk` FOREIGN KEY (`payment_frequency_fk`) REFERENCES `payment_frequency` (`payment_frequency_pk`),
  ADD CONSTRAINT `plans_status_fk` FOREIGN KEY (`plans_status_fk`) REFERENCES `plans_status` (`plans_status_pk`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
