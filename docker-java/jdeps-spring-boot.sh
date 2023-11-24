#!/bin/sh
# jdeps-spring-boot
# sh jdeps-spring-boot.sh /mnt/c/Users/nomuvan/eclipse-workspace/cdk-fargate-ex/build/libs/cdk-fargate-ex-0.0.1-SNAPSHOT.jar 17
# java.base,java.compiler,java.desktop,java.instrument,java.naming,java.net.http,java.prefs,java.rmi,java.scripting,java.security.jgss,java.security.sasl,java.sql,jdk.jfr,jdk.management,jdk.unsupported

set -eu

readonly TARGET_JAR=$1
readonly TARGET_VER=$2

# jarを展開するディレクトリ
readonly TMP_DIR="/tmp/app-jar"
mkdir -p ${TMP_DIR}
trap 'rm -rf ${TMP_DIR}' EXIT

# jarを展開
unzip -q "${TARGET_JAR}" -d "${TMP_DIR}"

# 出力
jdeps \
    -classpath \'${TMP_DIR}/BOOT-INF/lib/*:${TMP_DIR}/BOOT-INF/classes:${TMP_DIR}\' \
    --print-module-deps \
    --ignore-missing-deps \
    --module-path ${TMP_DIR}/BOOT-INF/lib/javax.activation-api-1.2.0.jar \
    --recursive \
    --multi-release ${TARGET_VER} \
    -quiet \
    ${TMP_DIR}/org ${TMP_DIR}/BOOT-INF/classes ${TMP_DIR}/BOOT-INF/lib/*.jar

