--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5
-- Dumped by pg_dump version 16.0 (Ubuntu 16.0-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: visauser
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO visauser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: configuration; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.configuration (
    id bigint NOT NULL,
    key character varying(256) NOT NULL,
    value character varying(8192) NOT NULL
);


ALTER TABLE public.configuration OWNER TO visauser;

--
-- Name: configuration_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.configuration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.configuration_id_seq OWNER TO visauser;

--
-- Name: configuration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.configuration_id_seq OWNED BY public.configuration.id;


--
-- Name: employer; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.employer (
    id bigint NOT NULL,
    country_code character varying(10),
    name character varying(200),
    town character varying(100)
);


ALTER TABLE public.employer OWNER TO visauser;

--
-- Name: experiment; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.experiment (
    id character varying(32) NOT NULL,
    end_date timestamp without time zone,
    start_date timestamp without time zone,
    instrument_id bigint NOT NULL,
    proposal_id bigint NOT NULL
);


ALTER TABLE public.experiment OWNER TO visauser;

--
-- Name: experiment_user; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.experiment_user (
    experiment_id character varying(32) NOT NULL,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.experiment_user OWNER TO visauser;

--
-- Name: flavour; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.flavour (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    compute_id character varying(250) NOT NULL,
    cpu real NOT NULL,
    deleted boolean NOT NULL,
    memory integer NOT NULL,
    name character varying(250) NOT NULL
);


ALTER TABLE public.flavour OWNER TO visauser;

--
-- Name: flavour_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.flavour_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.flavour_id_seq OWNER TO visauser;

--
-- Name: flavour_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.flavour_id_seq OWNED BY public.flavour.id;


--
-- Name: flavour_limit; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.flavour_limit (
    id bigint NOT NULL,
    object_id bigint NOT NULL,
    object_type character varying(255) NOT NULL,
    flavour_id bigint NOT NULL
);


ALTER TABLE public.flavour_limit OWNER TO visauser;

--
-- Name: flavour_limit_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.flavour_limit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.flavour_limit_id_seq OWNER TO visauser;

--
-- Name: flavour_limit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.flavour_limit_id_seq OWNED BY public.flavour_limit.id;


--
-- Name: image; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.image (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    autologin character varying(255),
    boot_command text,
    compute_id character varying(250) NOT NULL,
    deleted boolean NOT NULL,
    description character varying(2500),
    icon character varying(100) NOT NULL,
    name character varying(250) NOT NULL,
    version character varying(100),
    visible boolean NOT NULL
);


ALTER TABLE public.image OWNER TO visauser;

--
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.image_id_seq OWNER TO visauser;

--
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;


--
-- Name: image_protocol; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.image_protocol (
    image_id bigint NOT NULL,
    protocol_id bigint NOT NULL
);


ALTER TABLE public.image_protocol OWNER TO visauser;

--
-- Name: instance; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    comments character varying(2500),
    compute_id character varying(250),
    delete_requested boolean NOT NULL,
    deleted_at timestamp without time zone,
    ip_address character varying(255),
    keyboard_layout character varying(255) NOT NULL,
    last_interaction_at timestamp without time zone,
    last_seen_at timestamp without time zone,
    name character varying(250) NOT NULL,
    screen_height integer NOT NULL,
    screen_width integer NOT NULL,
    security_groups text,
    state character varying(50) NOT NULL,
    termination_date timestamp without time zone,
    uid character varying(16) NOT NULL,
    username character varying(100),
    plan_id bigint
);


ALTER TABLE public.instance OWNER TO visauser;

--
-- Name: instance_attribute; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_attribute (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    instance_id bigint NOT NULL
);


ALTER TABLE public.instance_attribute OWNER TO visauser;

--
-- Name: instance_attribute_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_attribute_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_attribute_id_seq OWNER TO visauser;

--
-- Name: instance_attribute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_attribute_id_seq OWNED BY public.instance_attribute.id;


--
-- Name: instance_authentication_token; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_authentication_token (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    token character varying(250) NOT NULL,
    instance_id bigint NOT NULL,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.instance_authentication_token OWNER TO visauser;

--
-- Name: instance_authentication_token_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_authentication_token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_authentication_token_id_seq OWNER TO visauser;

--
-- Name: instance_authentication_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_authentication_token_id_seq OWNED BY public.instance_authentication_token.id;


--
-- Name: instance_command; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_command (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    action_type character varying(50) NOT NULL,
    message character varying(255),
    state character varying(50) NOT NULL,
    instance_id bigint NOT NULL,
    user_id character varying(255)
);


ALTER TABLE public.instance_command OWNER TO visauser;

--
-- Name: instance_command_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_command_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_command_id_seq OWNER TO visauser;

--
-- Name: instance_command_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_command_id_seq OWNED BY public.instance_command.id;


--
-- Name: instance_experiment; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_experiment (
    experiment_id character varying(32) NOT NULL,
    instance_id bigint NOT NULL
);


ALTER TABLE public.instance_experiment OWNER TO visauser;

--
-- Name: instance_expiration; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_expiration (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    expiration_date timestamp without time zone NOT NULL,
    instance_id bigint NOT NULL
);


ALTER TABLE public.instance_expiration OWNER TO visauser;

--
-- Name: instance_expiration_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_expiration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_expiration_id_seq OWNER TO visauser;

--
-- Name: instance_expiration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_expiration_id_seq OWNED BY public.instance_expiration.id;


--
-- Name: instance_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_id_seq OWNER TO visauser;

--
-- Name: instance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_id_seq OWNED BY public.instance.id;


--
-- Name: instance_jupyter_session; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_jupyter_session (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    active boolean NOT NULL,
    kernel_id character varying(150) NOT NULL,
    session_id character varying(150) NOT NULL,
    instance_id bigint NOT NULL,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.instance_jupyter_session OWNER TO visauser;

--
-- Name: instance_jupyter_session_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_jupyter_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_jupyter_session_id_seq OWNER TO visauser;

--
-- Name: instance_jupyter_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_jupyter_session_id_seq OWNED BY public.instance_jupyter_session.id;


--
-- Name: instance_member; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_member (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    role character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    instance_id bigint NOT NULL
);


ALTER TABLE public.instance_member OWNER TO visauser;

--
-- Name: instance_member_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_member_id_seq OWNER TO visauser;

--
-- Name: instance_member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_member_id_seq OWNED BY public.instance_member.id;


--
-- Name: instance_session; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_session (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    connection_id character varying(150) NOT NULL,
    current boolean NOT NULL,
    instance_id bigint NOT NULL
);


ALTER TABLE public.instance_session OWNER TO visauser;

--
-- Name: instance_session_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_session_id_seq OWNER TO visauser;

--
-- Name: instance_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_session_id_seq OWNED BY public.instance_session.id;


--
-- Name: instance_session_member; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_session_member (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    active boolean NOT NULL,
    last_interaction_at timestamp without time zone,
    last_seen_at timestamp without time zone,
    role character varying(150) NOT NULL,
    session_id character varying(150) NOT NULL,
    instance_session_id bigint NOT NULL,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.instance_session_member OWNER TO visauser;

--
-- Name: instance_session_member_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_session_member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_session_member_id_seq OWNER TO visauser;

--
-- Name: instance_session_member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_session_member_id_seq OWNED BY public.instance_session_member.id;


--
-- Name: instance_thumbnail; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instance_thumbnail (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    data text NOT NULL,
    instance_id bigint NOT NULL
);


ALTER TABLE public.instance_thumbnail OWNER TO visauser;

--
-- Name: instance_thumbnail_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.instance_thumbnail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instance_thumbnail_id_seq OWNER TO visauser;

--
-- Name: instance_thumbnail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.instance_thumbnail_id_seq OWNED BY public.instance_thumbnail.id;


--
-- Name: instrument; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instrument (
    id bigint NOT NULL,
    name character varying(250) NOT NULL
);


ALTER TABLE public.instrument OWNER TO visauser;

--
-- Name: instrument_scientist; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.instrument_scientist (
    instrument_id bigint NOT NULL,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.instrument_scientist OWNER TO visauser;

--
-- Name: plan; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.plan (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    preset boolean NOT NULL,
    flavour_id bigint,
    image_id bigint
);


ALTER TABLE public.plan OWNER TO visauser;

--
-- Name: plan_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.plan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plan_id_seq OWNER TO visauser;

--
-- Name: plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.plan_id_seq OWNED BY public.plan.id;


--
-- Name: proposal; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.proposal (
    id bigint NOT NULL,
    identifier character varying(100) NOT NULL,
    public_at timestamp without time zone,
    summary character varying(5000),
    title character varying(2000)
);


ALTER TABLE public.proposal OWNER TO visauser;

--
-- Name: protocol; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.protocol (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    port integer NOT NULL
);


ALTER TABLE public.protocol OWNER TO visauser;

--
-- Name: protocol_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.protocol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.protocol_id_seq OWNER TO visauser;

--
-- Name: protocol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.protocol_id_seq OWNED BY public.protocol.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.role (
    id bigint NOT NULL,
    description character varying(250),
    name character varying(100) NOT NULL
);


ALTER TABLE public.role OWNER TO visauser;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO visauser;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: security_group; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.security_group (
    id bigint NOT NULL,
    name character varying(250) NOT NULL
);


ALTER TABLE public.security_group OWNER TO visauser;

--
-- Name: security_group_filter; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.security_group_filter (
    id bigint NOT NULL,
    object_id bigint NOT NULL,
    object_type character varying(255) NOT NULL,
    security_group_id bigint NOT NULL
);


ALTER TABLE public.security_group_filter OWNER TO visauser;

--
-- Name: security_group_filter_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.security_group_filter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.security_group_filter_id_seq OWNER TO visauser;

--
-- Name: security_group_filter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.security_group_filter_id_seq OWNED BY public.security_group_filter.id;


--
-- Name: security_group_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.security_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.security_group_id_seq OWNER TO visauser;

--
-- Name: security_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.security_group_id_seq OWNED BY public.security_group.id;


--
-- Name: system_notification; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.system_notification (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    activated_at timestamp without time zone,
    deleted_at timestamp without time zone,
    level character varying(50) NOT NULL,
    message character varying(4096) NOT NULL
);


ALTER TABLE public.system_notification OWNER TO visauser;

--
-- Name: system_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: visauser
--

CREATE SEQUENCE public.system_notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.system_notification_id_seq OWNER TO visauser;

--
-- Name: system_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: visauser
--

ALTER SEQUENCE public.system_notification_id_seq OWNED BY public.system_notification.id;


--
-- Name: user_role; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.user_role (
    user_id character varying(255) NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.user_role OWNER TO visauser;

--
-- Name: users; Type: TABLE; Schema: public; Owner: visauser
--

CREATE TABLE public.users (
    id character varying(255) NOT NULL,
    activated_at timestamp without time zone,
    email character varying(100),
    first_name character varying(100),
    instance_quota integer NOT NULL,
    last_name character varying(100) NOT NULL,
    last_seen_at timestamp without time zone,
    affiliation_id bigint
);


ALTER TABLE public.users OWNER TO visauser;

--
-- Name: configuration id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.configuration ALTER COLUMN id SET DEFAULT nextval('public.configuration_id_seq'::regclass);


--
-- Name: flavour id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.flavour ALTER COLUMN id SET DEFAULT nextval('public.flavour_id_seq'::regclass);


--
-- Name: flavour_limit id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.flavour_limit ALTER COLUMN id SET DEFAULT nextval('public.flavour_limit_id_seq'::regclass);


--
-- Name: image id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.image ALTER COLUMN id SET DEFAULT nextval('public.image_id_seq'::regclass);


--
-- Name: instance id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance ALTER COLUMN id SET DEFAULT nextval('public.instance_id_seq'::regclass);


--
-- Name: instance_attribute id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_attribute ALTER COLUMN id SET DEFAULT nextval('public.instance_attribute_id_seq'::regclass);


--
-- Name: instance_authentication_token id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_authentication_token ALTER COLUMN id SET DEFAULT nextval('public.instance_authentication_token_id_seq'::regclass);


--
-- Name: instance_command id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_command ALTER COLUMN id SET DEFAULT nextval('public.instance_command_id_seq'::regclass);


--
-- Name: instance_expiration id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_expiration ALTER COLUMN id SET DEFAULT nextval('public.instance_expiration_id_seq'::regclass);


--
-- Name: instance_jupyter_session id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_jupyter_session ALTER COLUMN id SET DEFAULT nextval('public.instance_jupyter_session_id_seq'::regclass);


--
-- Name: instance_member id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_member ALTER COLUMN id SET DEFAULT nextval('public.instance_member_id_seq'::regclass);


--
-- Name: instance_session id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_session ALTER COLUMN id SET DEFAULT nextval('public.instance_session_id_seq'::regclass);


--
-- Name: instance_session_member id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_session_member ALTER COLUMN id SET DEFAULT nextval('public.instance_session_member_id_seq'::regclass);


--
-- Name: instance_thumbnail id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_thumbnail ALTER COLUMN id SET DEFAULT nextval('public.instance_thumbnail_id_seq'::regclass);


--
-- Name: plan id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.plan ALTER COLUMN id SET DEFAULT nextval('public.plan_id_seq'::regclass);


--
-- Name: protocol id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.protocol ALTER COLUMN id SET DEFAULT nextval('public.protocol_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: security_group id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.security_group ALTER COLUMN id SET DEFAULT nextval('public.security_group_id_seq'::regclass);


--
-- Name: security_group_filter id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.security_group_filter ALTER COLUMN id SET DEFAULT nextval('public.security_group_filter_id_seq'::regclass);


--
-- Name: system_notification id; Type: DEFAULT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.system_notification ALTER COLUMN id SET DEFAULT nextval('public.system_notification_id_seq'::regclass);


--
-- Name: configuration configuration_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT configuration_pkey PRIMARY KEY (id);


--
-- Name: employer employer_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.employer
    ADD CONSTRAINT employer_pkey PRIMARY KEY (id);


--
-- Name: experiment experiment_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.experiment
    ADD CONSTRAINT experiment_pkey PRIMARY KEY (id);


--
-- Name: experiment_user experiment_user_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.experiment_user
    ADD CONSTRAINT experiment_user_pkey PRIMARY KEY (experiment_id, user_id);


--
-- Name: flavour_limit flavour_limit_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.flavour_limit
    ADD CONSTRAINT flavour_limit_pkey PRIMARY KEY (id);


--
-- Name: flavour flavour_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.flavour
    ADD CONSTRAINT flavour_pkey PRIMARY KEY (id);


--
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- Name: instance_attribute instance_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_attribute
    ADD CONSTRAINT instance_attribute_pkey PRIMARY KEY (id);


--
-- Name: instance_authentication_token instance_authentication_token_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_authentication_token
    ADD CONSTRAINT instance_authentication_token_pkey PRIMARY KEY (id);


--
-- Name: instance_command instance_command_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_command
    ADD CONSTRAINT instance_command_pkey PRIMARY KEY (id);


--
-- Name: instance_experiment instance_experiment_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_experiment
    ADD CONSTRAINT instance_experiment_pkey PRIMARY KEY (experiment_id, instance_id);


--
-- Name: instance_expiration instance_expiration_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_expiration
    ADD CONSTRAINT instance_expiration_pkey PRIMARY KEY (id);


--
-- Name: instance_jupyter_session instance_jupyter_session_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_jupyter_session
    ADD CONSTRAINT instance_jupyter_session_pkey PRIMARY KEY (id);


--
-- Name: instance_member instance_member_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_member
    ADD CONSTRAINT instance_member_pkey PRIMARY KEY (id);


--
-- Name: instance instance_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance
    ADD CONSTRAINT instance_pkey PRIMARY KEY (id);


--
-- Name: instance_session_member instance_session_member_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_session_member
    ADD CONSTRAINT instance_session_member_pkey PRIMARY KEY (id);


--
-- Name: instance_session instance_session_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_session
    ADD CONSTRAINT instance_session_pkey PRIMARY KEY (id);


--
-- Name: instance_thumbnail instance_thumbnail_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_thumbnail
    ADD CONSTRAINT instance_thumbnail_pkey PRIMARY KEY (id);


--
-- Name: instrument instrument_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instrument
    ADD CONSTRAINT instrument_pkey PRIMARY KEY (id);


--
-- Name: instrument_scientist instrument_scientist_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instrument_scientist
    ADD CONSTRAINT instrument_scientist_pkey PRIMARY KEY (instrument_id, user_id);


--
-- Name: plan plan_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_pkey PRIMARY KEY (id);


--
-- Name: proposal proposal_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.proposal
    ADD CONSTRAINT proposal_pkey PRIMARY KEY (id);


--
-- Name: protocol protocol_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.protocol
    ADD CONSTRAINT protocol_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: security_group_filter security_group_filter_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.security_group_filter
    ADD CONSTRAINT security_group_filter_pkey PRIMARY KEY (id);


--
-- Name: security_group security_group_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.security_group
    ADD CONSTRAINT security_group_pkey PRIMARY KEY (id);


--
-- Name: system_notification system_notification_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.system_notification
    ADD CONSTRAINT system_notification_pkey PRIMARY KEY (id);


--
-- Name: instance_expiration uk_instance_expiration_instance_id; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_expiration
    ADD CONSTRAINT uk_instance_expiration_instance_id UNIQUE (instance_id);


--
-- Name: instance_thumbnail uk_instance_thumbnail_instance_id; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_thumbnail
    ADD CONSTRAINT uk_instance_thumbnail_instance_id UNIQUE (instance_id);


--
-- Name: role uk_role_name; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT uk_role_name UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: experiment fk1pjluuse2br55pif204qydhe2; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.experiment
    ADD CONSTRAINT fk1pjluuse2br55pif204qydhe2 FOREIGN KEY (proposal_id) REFERENCES public.proposal(id);


--
-- Name: instance_command fk1xl7t8adnrvph97m63271mcy0; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_command
    ADD CONSTRAINT fk1xl7t8adnrvph97m63271mcy0 FOREIGN KEY (instance_id) REFERENCES public.instance(id);


--
-- Name: users fk21qdb57geqr9ac905ulojs60e; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk21qdb57geqr9ac905ulojs60e FOREIGN KEY (affiliation_id) REFERENCES public.employer(id);


--
-- Name: instance_member fk3vpc5n47vtjurc49ffmkr59mf; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_member
    ADD CONSTRAINT fk3vpc5n47vtjurc49ffmkr59mf FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: instrument_scientist fk4ysk12q3cwd2b7jwaea1kmvbb; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instrument_scientist
    ADD CONSTRAINT fk4ysk12q3cwd2b7jwaea1kmvbb FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: instance_session_member fk57h2bv3fom2bg6vw6fbp6nckn; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_session_member
    ADD CONSTRAINT fk57h2bv3fom2bg6vw6fbp6nckn FOREIGN KEY (instance_session_id) REFERENCES public.instance_session(id);


--
-- Name: instance_session_member fk5iuyx51wmopvtkxxgtwhepr6x; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_session_member
    ADD CONSTRAINT fk5iuyx51wmopvtkxxgtwhepr6x FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: instance_expiration fk6xa6wjiuwuhnhedtwom7qfrle; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_expiration
    ADD CONSTRAINT fk6xa6wjiuwuhnhedtwom7qfrle FOREIGN KEY (instance_id) REFERENCES public.instance(id);


--
-- Name: plan fk7rvpu1avej8ai0wykhj2vr1d6; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT fk7rvpu1avej8ai0wykhj2vr1d6 FOREIGN KEY (image_id) REFERENCES public.image(id);


--
-- Name: image_protocol fk8982gcy1j4h8p894rwqgam7p3; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.image_protocol
    ADD CONSTRAINT fk8982gcy1j4h8p894rwqgam7p3 FOREIGN KEY (protocol_id) REFERENCES public.protocol(id);


--
-- Name: instance_command fka0c2dg6qm027o1r6dybbfwgos; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_command
    ADD CONSTRAINT fka0c2dg6qm027o1r6dybbfwgos FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_role fka68196081fvovjhkek5m97n3y; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT fka68196081fvovjhkek5m97n3y FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: image_protocol fkcc3nc3y3u0ro3eqj18eg6huei; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.image_protocol
    ADD CONSTRAINT fkcc3nc3y3u0ro3eqj18eg6huei FOREIGN KEY (image_id) REFERENCES public.image(id);


--
-- Name: experiment_user fkcdep90gadbkbr7luuy86ypgsp; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.experiment_user
    ADD CONSTRAINT fkcdep90gadbkbr7luuy86ypgsp FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: flavour_limit fkcircujb122hrgaqh1nj0k3p3y; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.flavour_limit
    ADD CONSTRAINT fkcircujb122hrgaqh1nj0k3p3y FOREIGN KEY (flavour_id) REFERENCES public.flavour(id);


--
-- Name: instance_authentication_token fkd880myn4x0e5vprdvwq9iar6u; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_authentication_token
    ADD CONSTRAINT fkd880myn4x0e5vprdvwq9iar6u FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: experiment_user fkdijyk75nmy5bmgtnq6og2v4tb; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.experiment_user
    ADD CONSTRAINT fkdijyk75nmy5bmgtnq6og2v4tb FOREIGN KEY (experiment_id) REFERENCES public.experiment(id);


--
-- Name: experiment fketwbiap7400dfay39udo00ow5; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.experiment
    ADD CONSTRAINT fketwbiap7400dfay39udo00ow5 FOREIGN KEY (instrument_id) REFERENCES public.instrument(id);


--
-- Name: security_group_filter fkf9moifk3f6lfgt1pfwi5ogibs; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.security_group_filter
    ADD CONSTRAINT fkf9moifk3f6lfgt1pfwi5ogibs FOREIGN KEY (security_group_id) REFERENCES public.security_group(id);


--
-- Name: instrument_scientist fkfaebou3fhge7flovolkf50g1w; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instrument_scientist
    ADD CONSTRAINT fkfaebou3fhge7flovolkf50g1w FOREIGN KEY (instrument_id) REFERENCES public.instrument(id);


--
-- Name: plan fkgu3hqekcv0lrg8ay6fctgn859; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT fkgu3hqekcv0lrg8ay6fctgn859 FOREIGN KEY (flavour_id) REFERENCES public.flavour(id);


--
-- Name: instance_attribute fkhowt4d8kmk2e2br50y57cnw31; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_attribute
    ADD CONSTRAINT fkhowt4d8kmk2e2br50y57cnw31 FOREIGN KEY (instance_id) REFERENCES public.instance(id);


--
-- Name: user_role fkj345gk1bovqvfame88rcx7yyx; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT fkj345gk1bovqvfame88rcx7yyx FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: instance fkjboj8k7p0x46mjibxrahkjyni; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance
    ADD CONSTRAINT fkjboj8k7p0x46mjibxrahkjyni FOREIGN KEY (plan_id) REFERENCES public.plan(id);


--
-- Name: instance_experiment fkkev0pk4kdmdji6gv3k0ruvmtm; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_experiment
    ADD CONSTRAINT fkkev0pk4kdmdji6gv3k0ruvmtm FOREIGN KEY (experiment_id) REFERENCES public.experiment(id);


--
-- Name: instance_thumbnail fkmome82t4ks7lulmk27oq0ou35; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_thumbnail
    ADD CONSTRAINT fkmome82t4ks7lulmk27oq0ou35 FOREIGN KEY (instance_id) REFERENCES public.instance(id);


--
-- Name: instance_jupyter_session fkqnuodtf3rr8kouhnp0d4suugu; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_jupyter_session
    ADD CONSTRAINT fkqnuodtf3rr8kouhnp0d4suugu FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: instance_experiment fkr4o9iib34t5h3poowt9217gu0; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_experiment
    ADD CONSTRAINT fkr4o9iib34t5h3poowt9217gu0 FOREIGN KEY (instance_id) REFERENCES public.instance(id);


--
-- Name: instance_member fkr5nvm0ukc7i8wty4y13kdi150; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_member
    ADD CONSTRAINT fkr5nvm0ukc7i8wty4y13kdi150 FOREIGN KEY (instance_id) REFERENCES public.instance(id);


--
-- Name: instance_authentication_token fkse2ow2m20gad966lx1eocl7pi; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_authentication_token
    ADD CONSTRAINT fkse2ow2m20gad966lx1eocl7pi FOREIGN KEY (instance_id) REFERENCES public.instance(id);


--
-- Name: instance_session fkslg7127xtjcf67kd1jece29i6; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_session
    ADD CONSTRAINT fkslg7127xtjcf67kd1jece29i6 FOREIGN KEY (instance_id) REFERENCES public.instance(id);


--
-- Name: instance_jupyter_session fktn79fgfhjofy58y4sb0edhu8i; Type: FK CONSTRAINT; Schema: public; Owner: visauser
--

ALTER TABLE ONLY public.instance_jupyter_session
    ADD CONSTRAINT fktn79fgfhjofy58y4sb0edhu8i FOREIGN KEY (instance_id) REFERENCES public.instance(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: visauser
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

