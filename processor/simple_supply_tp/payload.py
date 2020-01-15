from sawtooth_sdk.processor.exceptions import InvalidTransaction

from simple_supply_protobuf import payload_pb2


class SimpleSupplyPayload(object):

    def __init__(self, payload):
        self._transaction = payload_pb2.SimpleSupplyPayload()
        self._transaction.ParseFromString(payload)

    @property
    def action(self):
        return self._transaction.action

    @property
    def data(self):
        if self._transaction.HasField('create_agent') and \
            self._transaction.action == \
                payload_pb2.SimpleSupplyPayload.CREATE_AGENT:
            return self._transaction.create_agent

        if self._transaction.HasField('create_record') and \
            self._transaction.action == \
                payload_pb2.SimpleSupplyPayload.CREATE_RECORD:
            return self._transaction.create_record

        if self._transaction.HasField('transfer_record') and \
            self._transaction.action == \
                payload_pb2.SimpleSupplyPayload.TRANSFER_RECORD:
            return self._transaction.transfer_record

        if self._transaction.HasField('update_record') and \
            self._transaction.action == \
                payload_pb2.SimpleSupplyPayload.UPDATE_RECORD:
            return self._transaction.update_record

        raise InvalidTransaction('Action does not match payload data')

    @property
    def timestamp(self):
        return self._transaction.timestamp
