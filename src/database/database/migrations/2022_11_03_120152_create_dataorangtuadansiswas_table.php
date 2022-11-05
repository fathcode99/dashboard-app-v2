<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dataorangtuadansiswas', function (Blueprint $table) {
            $table->id(); //id ortu
            $table->timestamps();
            $table->string('nama_orangtua');
            $table->unsignedBigInteger('id_siswa');
            $table->string('nama_siswa');
            $table->string('kelas');
            $table->string('kurikulum');
            $table->string('alamat');
            $table->string('kecamatan');
            $table->string('kota');
            $table->string('no_telp');
            $table->string('email');
            $table->string('mapel');
            $table->string('jadwal_les');
            $table->string('jam_mulai_les');
            $table->string('mulai_les');
            $table->string('jenis_bimble');
            $table->string('gender_tentor');
            $table->string('program');
            $table->string('status_siswa');
            $table->string('regional');
            $table->string('status_pendaftaran');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dataorangtuadansiswas');
    }
};
