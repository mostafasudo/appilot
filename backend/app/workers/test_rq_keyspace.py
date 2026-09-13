import rq.group as group
import rq.suspension as suspension
import rq.worker_registration as worker_registration
from rq.job import Job
from rq.queue import Queue
import rq.registry as registry
from rq.worker import Worker

from app.workers.rq_keyspace import configure_rq_keyspace


def test_configure_rq_keyspace_patches_core_rq_keys():
    configure_rq_keyspace()

    assert Queue.redis_queue_namespace_prefix.startswith("{appilot}")
    assert Queue.redis_queues_keys.startswith("{appilot}")

    assert Job.redis_job_namespace_prefix.startswith("{appilot}")

    assert Worker.redis_worker_namespace_prefix.startswith("{appilot}")
    assert Worker.redis_workers_keys.startswith("{appilot}")

    assert worker_registration.WORKERS_BY_QUEUE_KEY.startswith("{appilot}")
    assert worker_registration.REDIS_WORKER_KEYS.startswith("{appilot}")

    assert suspension.WORKERS_SUSPENDED.startswith("{appilot}")

    assert group.Group.REDIS_GROUP_NAME_PREFIX.startswith("{appilot}")
    assert group.Group.REDIS_GROUP_KEY.startswith("{appilot}")

    assert registry.BaseRegistry.key_template.format("default").startswith("{appilot}")
    assert registry.FinishedJobRegistry.key_template.format("default").startswith("{appilot}")
