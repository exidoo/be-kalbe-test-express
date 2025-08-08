-- CreateTable
CREATE TABLE "public"."user_management" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "full_name" TEXT,
    "role" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_management_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_ca_parameters" (
    "id" SERIAL NOT NULL,
    "created_by_id" INTEGER,
    "created_on" TIMESTAMP(3),
    "last_updated_by_id" INTEGER,
    "last_updated_on" TIMESTAMP(3),
    "is_active" BOOLEAN,
    "code" TEXT,
    "description" TEXT,

    CONSTRAINT "m_ca_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_ca_methods" (
    "id" SERIAL NOT NULL,
    "created_by_id" INTEGER,
    "created_on" TIMESTAMP(3),
    "last_updated_by_id" INTEGER,
    "last_updated_on" TIMESTAMP(3),
    "is_active" BOOLEAN,
    "code" TEXT,
    "description" TEXT,

    CONSTRAINT "m_ca_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_ca_sample_types" (
    "id" SERIAL NOT NULL,
    "created_by_id" INTEGER,
    "created_on" TIMESTAMP(3),
    "last_updated_by_id" INTEGER,
    "last_updated_on" TIMESTAMP(3),
    "is_active" BOOLEAN,
    "code" TEXT,
    "description" TEXT,

    CONSTRAINT "m_ca_sample_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_ca_analyses" (
    "id" SERIAL NOT NULL,
    "created_by_id" INTEGER,
    "created_on" TIMESTAMP(3),
    "last_updated_by_id" INTEGER,
    "last_updated_on" TIMESTAMP(3),
    "is_active" BOOLEAN,
    "code" TEXT,
    "description" TEXT,
    "lead_time" INTEGER,
    "parameter_id" INTEGER NOT NULL,
    "method_id" INTEGER NOT NULL,
    "sample_type_id" INTEGER NOT NULL,

    CONSTRAINT "m_ca_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_management_username_key" ON "public"."user_management"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_management_email_key" ON "public"."user_management"("email");

-- AddForeignKey
ALTER TABLE "public"."m_ca_parameters" ADD CONSTRAINT "m_ca_parameters_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."user_management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_parameters" ADD CONSTRAINT "m_ca_parameters_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "public"."user_management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_methods" ADD CONSTRAINT "m_ca_methods_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."user_management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_methods" ADD CONSTRAINT "m_ca_methods_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "public"."user_management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_sample_types" ADD CONSTRAINT "m_ca_sample_types_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."user_management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_sample_types" ADD CONSTRAINT "m_ca_sample_types_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "public"."user_management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_analyses" ADD CONSTRAINT "m_ca_analyses_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "public"."m_ca_parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_analyses" ADD CONSTRAINT "m_ca_analyses_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "public"."m_ca_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_analyses" ADD CONSTRAINT "m_ca_analyses_sample_type_id_fkey" FOREIGN KEY ("sample_type_id") REFERENCES "public"."m_ca_sample_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_analyses" ADD CONSTRAINT "m_ca_analyses_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."user_management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_ca_analyses" ADD CONSTRAINT "m_ca_analyses_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "public"."user_management"("id") ON DELETE SET NULL ON UPDATE CASCADE;
