FROM amazoncorretto:17.0.9-al2023 AS java-build
WORKDIR /jlink
ENV PATH $JAVA_HOME/bin:$PATH
RUN \
  dnf install -y binutils && \
  jlink \
  --strip-debug \
  --no-header-files \
  --no-man-pages \
  --compress=2 \
  --module-path $JAVA_HOME \
  --add-modules java.base,java.desktop,java.instrument,java.management.rmi,java.naming,java.prefs,java.scripting,java.security.jgss,java.sql,jdk.httpserver,jdk.unsupported \
  --output jre-min

FROM public.ecr.aws/amazonlinux/amazonlinux:2023-minimal
USER root

COPY --from=java-build /jlink/jre-min /opt/jre-min
ENV PATH /opt/jre-min/bin:$PATH
ENV LANG C.UTF-8
ENV JAVA_HOME /opt/jre-min

COPY cdk-fargate-ex-0.0.1-SNAPSHOT.jar /opt/demo/cdk-fargate-ex-0.0.1-SNAPSHOT.jar

EXPOSE 8080
WORKDIR /

# CMD sh -c 'trap "exit" TERM; while true; do sleep 1; done'
CMD ["java", "-jar", "/opt/demo/cdk-fargate-ex-0.0.1-SNAPSHOT.jar"]

# dnf remove yum
# java-17-amazon-corretto
# java-17-amazon-corretto-devel
# java-17-amazon-corretto-headless
# java-17-amazon-corretto-jmods


# FROM amazonlinux:2023
#
# ARG version=17.0.9.8-1
# ARG package_version=1
#
# RUN set -eux \
#   && rpm --import file:///etc/pki/rpm-gpg/RPM-GPG-KEY-amazon-linux-2023 \
#   && echo "localpkg_gpgcheck=1" >> /etc/dnf/dnf.conf \
#   && CORRETO_TEMP=$(mktemp -d) \
#   && pushd ${CORRETO_TEMP} \
#   && RPM_LIST=("java-17-amazon-corretto-headless-$version.amzn2023.${package_version}.$(uname -m).rpm" "java-17-amazon-corretto-$version.amzn2023.${package_version}.$(uname -m).rpm" "java-17-amazon-corretto-devel-$version.amzn2023.${package_version}.$(uname -m).rpm" "java-17-amazon-corretto-jmods-$version.amzn2023.${package_version}.$(uname -m).rpm") \
#   && for rpm in ${RPM_LIST[@]}; do \
#   curl --fail -O https://corretto.aws/downloads/resources/$(echo $version | tr '-' '.')/${rpm} \
#   && rpm -K "${CORRETO_TEMP}/${rpm}" | grep -F "${CORRETO_TEMP}/${rpm}: digests signatures OK" || exit 1; \
#   done \
#   && dnf install -y ${CORRETO_TEMP}/*.rpm \
#   && popd \
#   && rm -rf /usr/lib/jvm/java-17-amazon-corretto.$(uname -m)/lib/src.zip \
#   && rm -rf ${CORRETO_TEMP} \
#   && dnf clean all \
#   && sed -i '/localpkg_gpgcheck=1/d' /etc/dnf/dnf.conf

# ENV LANG C.UTF-8
# ENV JAVA_HOME=/usr/lib/jvm/java-17-amazon-corretto

# CMD sh -c 'trap "exit" TERM; while true; do sleep 1; done'
